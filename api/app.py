from flask import Flask
from flask_restful import Api
from extensions import jwt
import firebase_admin
from config import Config
from api.resources.auth import LoginResource, LogoutResource, RefreshResource, jwt_blacklist
from api.resources.user import UserCreationResource, UserViewResource
from api.resources.listing import ListingResource, MyListingResource, RequestListingResource, ListingViewResource, ListingDiscoverResource
from api.resources.notifications import NotificationResource, ReadNotificationResource
from api.resources.dummy import TestEndpoint, ProtectedTestEndpoint

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
    api.add_resource(UserCreationResource, "/api/users")
    api.add_resource(UserViewResource, "/api/users/<id>")
    api.add_resource(RefreshResource, "/api/users/refresh")
    api.add_resource(ListingResource, "/api/listings")
    api.add_resource(MyListingResource, "/api/listings/me")
    api.add_resource(NotificationResource, "/api/notifs/me")
    api.add_resource(ReadNotificationResource, "/api/notifs/read/<notifId>")
    api.add_resource(RequestListingResource, "/api/listings/<listingId>/request")
    api.add_resource(ListingViewResource, "/api/listings/<listingId>")
    api.add_resource(ListingDiscoverResource, "/api/listings/discover")
    api.add_resource(TestEndpoint, "/api/testEndpoint")
    api.add_resource(ProtectedTestEndpoint, "/api/protectedTestEndpoint")

if __name__ == '__main__':
    app = create_app()
    app.run()
