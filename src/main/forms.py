"""This module contains WTForm classes for HTML forms.

Classes:
    - **CreateOwnership:** Template of creating an ownership form.
    - **TransferToken:** Template of making transfer form.
    - **CheckOwnership:** Template of form for getting asset and \
    number of tokens of an ownership.
    - **GetOwners:** Template of form for listing ownerships of an \
    asset.
    - **GetOwnersDistro:** Template of form for listing ownerships and \
    their number of tokens of an asset.
"""

from flask_wtf import FlaskForm
from wtforms.fields import StringField, SubmitField, SelectField

_message = "Please create ownership first"


class CreateOwnership(FlaskForm):
    """Template of creating an ownership form"""

    owner_id = StringField('Owner ID')
    asset_id = StringField('Asset ID')
    ntokens = StringField('Number of Token')
    submit = SubmitField('Create')


class TransferToken(FlaskForm):
    """Template of making transfer form"""

    from_owner = SelectField('From', choices=[("NoAcc", _message)])
    to_owner = StringField('To')
    quantity = StringField('Quantity')
    submit = SubmitField('Transfer Token(s)')


class CheckOwnership(FlaskForm):
    """Template of form for getting asset and number of tokens of an \
    ownership
    """

    owners = SelectField('Owner', choices=[("NoAcc", _message)])
    submit = SubmitField('Check Ownership')


class GetOwners(FlaskForm):
    """Template of form for listing ownerships of an asset"""

    assets = SelectField('Asset ID', choices=[("NoAcc", _message)])
    submit = SubmitField('Get Owners')


class GetOwnersDistro(FlaskForm):
    """Template of form for listing ownerships and their number of \
    tokens of an asset
    """

    assets = SelectField('Asset ID', choices=[("NoAcc", _message)])
    submit = SubmitField('Get Owners and Tokens')
