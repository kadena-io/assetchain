"""
Subpackages:
    - **main**
    - **pactapi**
Modules:
    - **models**
Functions:
    - **create_app**
"""

from flask import Flask
from flask_bootstrap import Bootstrap
from flasgger import Swagger
from flask_cors import CORS

from config import config

bootstrap = Bootstrap()
swagger = Swagger()


def create_app(config_name):
    """Initiate Flask application.

    :param config_name: The name of the server config file
    :return: Returns Flask application
    """
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    config[config_name].init_app(app)

    bootstrap.init_app(app)
    swagger.init_app(app)
    CORS(app, resources='/*')

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint)

    return app
