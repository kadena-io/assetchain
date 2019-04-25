"""This module produces proper pact commands to execute them in Pact
Server.

Classes:
    - **AssetTokenizationPactAdapter**
    - **CommandFactory**

"""


class AssetTokenizationPactAdapter:
    """An interface to generate pact commands

    Methods:
            - **build:** It calls CommandFactory class in order to  \
            produce Pact command.
            - **create_ownership:** It produces a Pact command to \
            insert a new ownership entry into ownerships table.
            - **transfer_token:** It produces a Pact command to make \
            transfers.
            - **check_ownership:** It produces a Pact command to \
            return ownership data.
            - **get_owners:** It produces a Pact command to return the \
            ownership list.
            - **get_owners_and_tokens:** It produces a Pact command to \
            return the distribution of tokens as of its owners.
            - **get_owners_ids:** It produces a Pact command to get \
            ownership list.
            - **get_asset_ids:** It produces a Pact command to get \
            asset list.
    """

    keyset = "(read-keyset 'admin-keyset)"

    @classmethod
    def build(cls, module_name, func_name, keyset, **kwargs):
        """It calls CommandFactory class in order to produce
        Pact command.

        :param module_name: The name of pact module which contains
        function name
        :param func_name: The name of function to be executed
        :param keyset: Keyset to be used by function
        :param kwargs: Additional parameters for pact function arguments
        :return: Returns pact command
        """
        return CommandFactory(module_name, func_name, keyset, **kwargs).create()

    @classmethod
    def create_ownership(cls, **kwargs):
        """Inserts a new ownership entry into ownerships table.

        :param kwargs: Additional parameters for pact function arguments
        :return: Returns pact command
        """
        return cls.build("assettokenization", "create-ownership",
                         cls.keyset, **kwargs)

    @classmethod
    def transfer_token(cls, **kwargs):
        """The function transfers tokens from an owner to another.

        :param kwargs: Additional parameters for pact function arguments
        :return: Returns pact command
        """
        return cls.build("assettokenization", "transfer-token",
                         cls.keyset, **kwargs)

    @classmethod
    def check_ownership(cls, **kwargs):
        """Checks the quantity of a specific ownership.

        :param kwargs: Additional parameters for pact function arguments
        :return: Returns pact command
        """
        return cls.build("wallet", "check-ownership", cls.keyset, **kwargs)

    @classmethod
    def get_owners(cls, **kwargs):
        """Given an asset id, returns ownership list.

        :param kwargs: Additional parameters for pact function arguments
        :return: Returns pact command
        """
        return cls.build("wallet", "get-owners", cls.keyset, **kwargs)

    @classmethod
    def get_owners_and_tokens(cls, **kwargs):
        """Given an ownership id, returns number of tokens.

        :param kwargs: Additional parameters for pact function arguments
        :return: Returns pact command
        """
        return cls.build("wallet", "get-owners-distro", cls.keyset, **kwargs)

    @classmethod
    def get_owners_ids(cls):
        """Returns ownership list.

        :return: Returns pact command
        """
        return cls.build("assettokenization", "keys",
                         "", **{"owners": "/iownerships"})

    @classmethod
    def get_asset_ids(cls):
        """Given an ownership id, returns the assets.

        :return: Returns pact command
        """
        return cls.build("wallet", "get-assets", "", **{})


class CommandFactory:
    """Pact command generator

    Methods:
        create: It is a generic method that produces pact commands.
    """

    def __init__(self, module_name, function_name, keyset, **kwargs):
        """ Initiate instance variables.

        :param module_name: The name of pact module which contains
        function name
        :param function_name: The name of function to be executed
        :param keyset: Keyset to be used by function
        :param kwargs: Additional parameters for pact function arguments
        """
        self.module_name = module_name
        self.function_name = function_name
        self.kwargs = kwargs
        self.keyset = keyset

    def create(self):
        """ Generate pact command.

        :return: Return pact command as a string
        """
        pact_command = f'(use \'{self.module_name}) ({self.function_name}'

        for val in self.kwargs.values():
            param = str(val[2:]) if val[:2] == "/i" else '"' + val + '"'
            pact_command += ' ' + param

        return pact_command + " " + self.keyset + ')'
