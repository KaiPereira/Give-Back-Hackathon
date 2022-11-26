from flask import Flask
from flask_restful import Api
from extensions import jwt
import firebase_admin
from config import Config
from api.resources.auth import CreateUserResource, LoginResource, LogoutResource, RefreshResource, jwt_blacklist
from api.resources.listing import CreateListingResource

def register_extensions(app):
    jwt.init_app(app)

    @jwt.token_in_blocklist_loader
    def check_if_token_in_blacklist(header, token):
        jti = token['jti']
        return jti in jwt_blacklist

def create_app():
    app = Flask("aE5tSQPC51AFDUzOE3U3t5Ddz")
    app.config.from_object(Config)

    register_extensions(app)
    register_resources(app)

    return app

def register_resources(app):
    api = Api(app)

    api.add_resource(LoginResource, "/api/users/login")
    api.add_resource(LogoutResource, "/api/users/logout")
    api.add_resource(CreateUserResource, "/api/users/create")
    api.add_resource(RefreshResource, "/api/users/refresh")
    api.add_resource(CreateListingResource, "/api/listings/create")


if __name__ == '__main__':
    app = create_app()
    app.run()