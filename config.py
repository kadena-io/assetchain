"""This module contains configurations of Flask application.

Classes:
    - **Config**
    - **DevelopmentConfig**
    - **TestConfig**
    - **Production**
"""

import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:

    SECRET_KEY = '9GewGXDXfL1T-wZf1NQNeRb4vU8IHQIMkcLDTGI10Zs'
    # Pact server url
    PACT_SERVER = 'http://localhost:8081/api/v1/'

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):

    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'log/pact.sqlite'


class TestConfig(Config):

    TESTING = True


class Production(Config):

    DEBUG = False


config = {
    'development': DevelopmentConfig,
    'testing': TestConfig,
    'production': Production,
    'default': DevelopmentConfig
}
