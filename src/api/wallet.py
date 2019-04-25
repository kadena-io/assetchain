from flask import jsonify, request
from flasgger import swag_from

from . import api
from .. import models
from ..pactapi import api as papi, pact_command_adapter as pca


@api.route('/ownership/new', methods=['POST'])
@swag_from('specs/create-ownership.yml')
def new_ownership():
    required = ['asset_id', 'owner_id', 'ntokens']
    data = request.get_json()

    if data is None or not any(k in data for k in required):
        return jsonify({'error': 'Missing values'}), 400

    kwargs = {
        'owner_id': data['owner_id'],
        'asset_id': data['asset_id'],
        'ntokens': "/i" + str(data['ntokens'])
    }
    result = papi.send_and_listen(pca.create_ownership(**kwargs))
    return jsonify({'result': result}), 201


@api.route('/ownership/all', methods=['GET'])
@swag_from('specs/ownerships.yml')
def ownership_list():
    ownerships = papi.send_and_listen(pca.get_owners_ids())
    return jsonify(ownerships)


@api.route('/ownership/check/<string:owners>', methods=['GET'])
@swag_from('specs/check-ownership.yml')
def check_ownership(owners):
    if owners is None:
        return jsonify({'error': 'Missing values'}), 400

    result = papi.send_and_listen(pca.check_ownership(**{'owners': owners}))
    return jsonify({'quantity': result[0], 'assetid': result[1]})


@api.route('/ownership/owners/<string:assetid>', methods=['GET'])
@swag_from('specs/asset-ownership.yml')
def asset_owners_dist(assetid):
    if assetid is None:
        return jsonify({'error': 'Missing values'}), 400

    result = papi.send_and_listen(pca.get_owners_and_tokens(**{'asset': assetid}))
    return jsonify([[d['ownerid'], d['ntokens']] for d in result])


@api.route('/transfer', methods=['POST'])
def transfer():
    required = ['from', 'to', 'quantity']
    data = request.get_json()

    if data is None or not any(k in data for k in required):
        return jsonify({'error': 'Missing values'}), 400

    kwargs = {
        'from_owner': data['from'],
        'to_owner': data['to'],
        'quantity': "/i" + str(data['quantity'])
    }
    result = papi.send_and_listen(pca.transfer_token(**kwargs))
    return jsonify(result), 201


@api.route('/transactions/bykey/<string:key>', methods=['GET'])
@swag_from('specs/tx-owner.yml')
def transactions_by_owner(key):
    if key is None:
        return jsonify({'error': 'Missing values'}), 400

    transactions = models.get_transactions(key, 'key')
    return jsonify([tx.as_dict() for tx in transactions])


@api.route('/transactions/asset/<string:assetid>', methods=['GET'])
@swag_from('specs/tx-assetid.yml')
def transactions_by_assetid(assetid):
    if assetid is None:
        return jsonify({'error': 'Missing values'}), 400
    transactions = models.get_transactions(assetid, 'assetid')
    return jsonify([tx.as_dict() for tx in transactions])


@api.route('/assets', methods=['GET'])
def assets():
    asset_list = papi.send_and_listen(pca.get_asset_ids())
    return jsonify(asset_list)
