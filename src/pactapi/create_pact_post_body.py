"""This module contains helper functions for generating POST method's
body of pact server endpoint.

Functions:
    - **create_hash:** It generates hash of pact code and signs it.
    - **prepare_request_body:** Generates JSON string for pact API's \
    "send" endpoint body.

"""
import hashlib
import ed25519
import json
import datetime


def create_hash(pact_code, pub_key, priv_key):
    """Generate hash of pact code and signs it.

    :param pact_code: The dictionary of Pact yaml file
    :param pub_key: Public key of signing key
    :param priv_key: Private key of signing key
    :return: Returns tuple of hash of pact code and signed hash.
    """
    pact_code = bytes(pact_code, encoding="utf8")
    hash2b = hashlib.blake2b()
    hash2b.update(pact_code)
    sk = ed25519.keys.SigningKey(bytes(priv_key, encoding="utf8"))
    signing_key = priv_key + pub_key
    sk.vk_s = bytes.fromhex(pub_key)
    sk.sk_s = bytes.fromhex(signing_key)

    return hash2b.hexdigest(), sk.sign(hash2b.digest()).hex()


def prepare_request_body(pact_code, pub_key, priv_key):
    """Generate JSON string from objects for pact API's "send"
    endpoint body.

    :param pact_code: The dictionary of Pact yaml file
    :param pub_key: Public key of signing key
    :param priv_key: Private key of signing key
    :return: Returns Pact executable's output
    """

    test_data = "arbitrary user data"
    nonce = str(datetime.datetime.now())
    cmd = {"address": None,
           "payload": {"exec":
                       {"data": {"testdata": test_data,
                                 "admin-keyset": [pub_key]},
                        "code": pact_code}
                       },
           "nonce": nonce
           }

    pact_cmd = json.dumps(cmd)
    hash_code, sig = create_hash(pact_cmd, pub_key, priv_key)

    scheme = "ED25519"
    cmds = {"cmds":
                [{"hash": hash_code,
                  "sigs": [{"sig": sig,
                            "scheme": scheme,
                            "pubKey": pub_key}],
                  "cmd": pact_cmd}]
            }
    result = json.dumps(cmds)

    return result
