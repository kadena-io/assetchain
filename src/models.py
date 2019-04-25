"""This module aims to store Model classes. For now it executes raw
SQL queries. It will be replaced with Database Model classes soon.

Classes:
    - **Transaction**
Functions:
    - **get_transactions:** It creates 'Transaction History' list.
"""

import json
import sqlite3 as sqlite

from config import basedir


class Transaction:
    """

    Methods:
        as_dict
    """

    def __init__(self, to_ID, tx_type, explain, tokens, asset_id, from_ID,
                 datacommand):
        """Initiate instance variables.

        :param to_ID: Receiver ownership ID
        :param tx_type: Transaction type
        :param explain: Transaction direction
        :param tokens: Quantity of tokens
        :param asset_id: Asset ID
        :param from_ID: Sender ownership ID
        :param datacommand:
        """
        self.to_ID = to_ID
        self.tx_type = tx_type
        self.explain = explain
        self.tokens = tokens
        self.asset_id = asset_id
        self.from_ID = from_ID

        # commands[2] = pactCommands command column
        dscmd = json.loads(datacommand[2])
        self.nonce = dscmd['nonce']

        # commands[3] = pactCommands result column
        dsresult = json.loads(datacommand[3])
        self.success = dsresult['status']
        self.quantity = dsresult['data'].split('quantity=', 1)[1]

    def as_dict(self):
        """
        :return: Returns dictionary attribute of the class instance
        """
        return {"asset_id": self.asset_id,
                "explain": self.explain,
                "from_ID": self.from_ID,
                "nonce": self.nonce.replace('"', ''),
                "quantity": self.quantity,
                "to_ID": self.to_ID,
                "tokens": self.tokens,
                "tx_type": self.tx_type}


def get_transactions(searchstr, filterby):
    """Create 'Transaction History' list.

    :param searchstr: Serialised ownership
    :param filterby: Transaction history type
    :return: Returns list of transaction history
    """
    if searchstr is None:
        raise ValueError('Please provide a key')

    db = sqlite.connect(basedir + '/pact/log/pact.sqlite')
    transactions = db.execute(f'SELECT * FROM '
                              f'USER_assettokenization_ownerships_TX '
                              f'WHERE value LIKE "%""{filterby}"":""{searchstr}""%";'
                              # can be ordered desc by key for latest transactions
                              ).fetchall()
    db.close()

    txs = []
    for tx in transactions:
        dbCommand = sqlite.connect(basedir + '/pact/log/commands.sqlite')
        commands = dbCommand.execute(f'SELECT * FROM '
                                     f'pactCommands '
                                     f'WHERE txid="{tx[0]}";'
                                     ).fetchall()
        dbCommand.close()

        tx_list = json.loads(tx[1])
        # tx_list[0] = USER_assettokenization_ownerships_TX table value column
        asset_id = tx_list[0]['value']['assetid']

        if len(tx_list) == 1:
            txs.append(Transaction(to_ID='', tx_type='IN',
                                   explain='',
                                   tokens=tx_list[0]['value']['ntokens'],
                                   asset_id=asset_id,
                                   from_ID=tx_list[0]["key"],
                                   datacommand=commands[0]))
            continue

        if tx_list[0]['key'] == searchstr:
            txs.append(Transaction(to_ID=tx_list[1]["key"], tx_type='OUT',
                                   explain='To',
                                   tokens=tx_list[0]['value']['ntokens'],
                                   asset_id=asset_id,
                                   from_ID=tx_list[0]["key"],
                                   datacommand=commands[0]))
        else:
            txs.append(Transaction(to_ID=tx_list[1]["key"], tx_type='IN',
                                   explain='From',
                                   tokens=tx_list[1]['value']['ntokens'],
                                   asset_id=asset_id,
                                   from_ID=tx_list[0]["key"],
                                   datacommand=commands[0]))
    return txs
