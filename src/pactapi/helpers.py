"""This module contains helper functions for generating POST method's
body of pact server endpoint.

Functions:
    - **create_base_yaml:** It creates Pact yaml file dictionary.
    - **get_yaml:** It adds pact command to the dictionary.
    - **prepare_request_body:** It creates yaml file and passes it to \
    Pact executable.
"""

import os
import datetime
from subprocess import Popen, PIPE

import yaml


# TODO: Move to config file
def create_base_yaml():
    """Create a dictionary of template of Pact yaml file.

    :return: Returns the dictionary
    """
    return {
        'code': '',
        'data': {
            'admin-keyset': [
                'ba54b224d1924dd98403f5c751abdd10de6cd81b0121800bf7bdbdcfaec7388d']
        },
        'keyPairs': [
            {
                'public': 'ba54b224d1924dd98403f5c751abdd10de6cd81b0121800bf7bdbdcfaec7388d',
                'secret': '8693e641ae2bbe9ea802c736f42027b03f86afe63cae315e7169c9c496c17332'
            },
            {
                'public': '5f533f2619b968c34a2d5a44090a56da4c11c08dacc4ac9b562960637ab65f80',
                'secret': 'adeacc0284f9c50ad11196b3549199a03f7369dbd20fb18617be98552a4337d9'
            }
        ],
        'nonce': str(datetime.datetime.now())
    }


def get_yaml(pact_command):
    """Add pact command to the dictionary.

    :param pact_command: Serialised pact command
    :return: Returns the dictionary
    """
    base = create_base_yaml()
    base['code'] = pact_command


    return base


def prepare_request_body(req_body):
    """Create yaml file and pass it to Pact executable.

    :param req_body: The dictionary of Pact yaml file
    :return: Returns Pact executable's output
    """
    try:
        with open('c.yaml', 'w') as f:
            yaml.dump(req_body, f, default_flow_style=False)

        output, err = Popen(['pact', '-a', 'c.yaml'],
                            stdout=PIPE, stderr=PIPE, stdin=PIPE,
                            universal_newlines=True).communicate()
        if err:
            raise Exception(f'Reason: {err}')
        return output
    except Exception:  # it was bare except, i.e. (except:), yet it's a violation for PEP-8.
        raise
    finally:
        if os.path.exists('c.yaml'):
            os.remove('c.yaml')
