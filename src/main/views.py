"""This module contains functions that are executed due to the request
from the UI.

Functions:
    - **index:** Redirect to home page.
    - **create_ownership:** Redirect to 'create ownership' page and \
    create 'create ownership' WTForm.
    - **make_transfer:** Redirect to 'make transfer' page and create \
    'make transfer' WTForm.
    - **check_ownership:** Redirect to 'check ownership' page and \
    create 'check ownership' WTForm.
    - **get_owners:** Redirect to 'owners' page and create 'owners'\
    WTForm.
    - **get_owners_distro:** Redirect to 'owner distribution' page and \
    create 'owner distribution' WTForm.
    - **get_transactions:** Redirect to 'transaction history' page and \
    create 'transaction history' WTForm.
"""

from flask import flash, render_template

from . import main, forms
from .. import models
from ..pactapi import api, pact_command_adapter


@main.route('/')
def index():
    """Redirect to the home page of the DApp

    :return: Return a Flask Template to create home page.
    """
    return render_template('index.html')


@main.route('/create-ownership', methods=['GET', 'POST'])
def create_ownership():
    """Create a WTForm for creating ownership. Validate the form fields on
    POST request. Request Pact Server to create an ownership and get
    result.

    :return: Return a Flask Template to create 'create ownership' page.
    """
    form = forms.CreateOwnership()
    if form.validate_on_submit():
        result = api.send_and_listen(
            pact_command_adapter.create_ownership(
                **{'owner_id': form.owner_id.data,
                   'asset_id': form.asset_id.data,
                   'ntokens': "/i" + form.ntokens.data}
            )
        )
        flash(f'Result : {result}')
    return render_template('create_ownership.html', form=form, action_type=1)


@main.route('/make-transfer', methods=['GET', 'POST'])
def make_transfer():
    """Create a WTForm for making transfer. Get ownership list on GET
    request. Validate the form fields on POST request. Request Pact
    Server to make transfer and get result.

    :return: Return a Flask Template to create 'make transfer' page.
    """
    form = forms.TransferToken()
    ownership_list = api.send_and_listen(pact_command_adapter.get_owners_ids())
    form.from_owner.choices = [(i, i) for i in ownership_list]

    if form.validate_on_submit():
        result = api.send_and_listen(
            pact_command_adapter.transfer_token(
                **{'from_owner': form.from_owner.data,
                   'to_owner': form.to_owner.data,
                   'quantity': "/i" + form.quantity.data}
            )
        )
        flash(f'Result : {result}')
    return render_template('make_transfer.html', form=form, action_type=2)


@main.route('/check-ownership', methods=['GET', 'POST'])
def check_ownership():
    """Create a WTForm for check ownership. Get ownership list on GET
    request. Get asset and number of token of an owner on POST request.
    Request Pact Server to check ownership and get result.

    :return: Return a Flask Template to create 'check ownership' page.
    """
    form = forms.CheckOwnership()
    ownership_list = api.send_and_listen(pact_command_adapter.get_owners_ids())
    form.owners.choices = [(i, i) for i in ownership_list]

    result = ""
    if form.is_submitted():
        result = api.send_and_listen(
            pact_command_adapter.check_ownership(
                **{'owners': form.owners.data})
        )

    return render_template('check_ownership.html', form=form,
                           result=result, action_type=3)


@main.route('/get-owners', methods=['GET', 'POST'])
def get_owners():
    """Create a WTForm for getting ownership. Get asset list on GET
    request. Get owners of an asset on POST request. Request Pact Server
    to get owner and get result.

    :return: Return a Flask Template to create 'get ownership' page.
    """
    form = forms.GetOwners()
    asset_list = api.send_and_listen(pact_command_adapter.get_asset_ids())
    form.assets.choices = [(i, i) for i in asset_list]

    result = ""
    if form.is_submitted():
        result = api.send_and_listen(
            pact_command_adapter.get_owners(**{'asset': form.assets.data})
        )

    return render_template('get_owners.html', form=form,
                           result=result, action_type=4)


@main.route('/get-owners-and-token-quantity', methods=['GET', 'POST'])
def get_ownership_distro():
    """Create a WTForm for getting ownership distribution. Get asset
    list on GET request. Get owners and their number of tokens of an
    asset on POST request. Request Pact Server to get owner distribution
    and get result.

    :return: Return a Flask Template to create 'get ownership  \
    distribution' page.
    """
    form = forms.GetOwnersDistro()
    asset_list = api.send_and_listen(pact_command_adapter.get_asset_ids())
    form.assets.choices = [(i, i) for i in asset_list]

    result = ""
    if form.is_submitted():
        result = api.send_and_listen(
            pact_command_adapter.get_owners_and_tokens(
                **{'asset': form.assets.data})
        )

    return render_template('get_ownership_distro.html', form=form,
                           result=result, action_type=5)


@main.route('/transactionsbyowner', methods=['GET', 'POST'])
def get_transactionsbyowner():
    """Create a WTForm for getting transaction history. Get ownership
    list on GET request. Get transaction history of an ownership on POST
    request. Request Pact Server to get ownership list and get
    transaction history result.

    :return: Return a Flask Template to create 'transaction history' \
    page.
    """
    form = forms.CheckOwnership()
    form.submit.label.text = 'Get Owner Transactions'

    ownership_list = api.send_and_listen(pact_command_adapter.get_owners_ids())
    form.owners.choices = [(i, i) for i in ownership_list]

    transactions = []  # do not use list-comp, template use "transactions"
    if form.is_submitted():
        transactions = models.get_transactions(form.owners.data, "key")

    return render_template('ownertransactions.html', txs=transactions,
                           form=form, action_type=6)


@main.route('/transactionsbyasset', methods=['GET', 'POST'])
def get_transactionsbyasset():
    form = forms.GetOwnersDistro()
    form.submit.label.text = 'Get Asset Transactions'

    ownership_list = api.send_and_listen(pact_command_adapter.get_asset_ids())
    form.assets.choices = [(i, i) for i in ownership_list]

    transactions = []  # do not use list-comp, template use "transactions"
    if form.is_submitted():
        transactions = models.get_transactions(form.assets.data, "assetid")

    return render_template('assettransactions.html', txs=transactions,
                           form=form, action_type=6)
