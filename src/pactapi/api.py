"""This module make requests to the endpoints of Pact API.

Functions:
    - **send:** It makes a POST Request to Pact API's 'send' endpoint.
    - **listen:** It makes a POST Request to Pact API's 'listen' \
    endpoint.
    - **local:** It makes a POST Request to Pact API's 'local' endpoint.
    - **send_and_listen:** It combines send and listen functions.
"""

import json
import requests
from flask import current_app

from . import create_pact_post_body

pub_key = "ba54b224d1924dd98403f5c751abdd10de6cd81b0121800bf7bdbdcfaec7388d"
priv_key = "8693e641ae2bbe9ea802c736f42027b03f86afe63cae315e7169c9c496c17332"


def send(pact_command):
    """ Make a POST Request to Pact API's 'send' endpoint.

    :param pact_command: Serialised pact command
    :return: The result of POST request
    """
    req_body = json.loads(
        create_pact_post_body.prepare_request_body(pact_command, pub_key,
                                                   priv_key))
    result = requests.post(current_app.config['PACT_SERVER'] + 'send',
                           json=req_body)
    return result


def listen(listen_key):
    """Make a POST Request to Pact API's 'listen' endpoint.

    :param listen_key: A key to be used for 'listen' endpoint body
    :return: The result of POST request
    """
    req_body = json.dumps({"listen": listen_key})
    result = requests.post(current_app.config['PACT_SERVER'] + 'listen',
                           req_body)
    return result


def local(listen_key):
    """Make a POST Request to Pact API's 'local' endpoint.

    :param listen_key: A key to be used for 'local' endpoint body
    :return: The result of POST request
    """
    req_body = json.dumps({"listen": listen_key})
    result = requests.post(current_app.config['PACT_SERVER'] + 'local',
                           req_body)
    return result


def send_and_listen(pact_command):
    """Call 'send' and 'listen' functions, respectively.

    :param pact_command: Serialised pact command
    :return: The result of POST request
    """
    res = send(pact_command)
    json_key = json.loads(res.text)
    listen_response = listen(json_key['response']['requestKeys'].pop())

    response = json.loads(listen_response.text)["response"]

    if 'data' in response["result"]:
        return response["result"]["data"]
    elif 'error' in response["result"]:
        return response["result"]["detail"]

    return response["result"]
