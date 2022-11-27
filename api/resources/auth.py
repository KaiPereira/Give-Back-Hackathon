from flask_restful import Resource
from http import HTTPStatus
from flask import request
from utils.dbUtils import getUserFromUsername
from utils.authUtils import verifyPassword
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token, get_jwt

jwt_blacklist = set()


class LoginResource(Resource):

    def post(self):
        try:
            data = request.get_json()
            username = data["username"]
            password = data["password"]
        except KeyError:
            return  {"msg": "Username or password not provided."}, HTTPStatus.BAD_REQUEST

        userDict, userObj = getUserFromUsername(username)

        if not userDict or not userObj:
            return {"msg": "Username or password is incorrect"}, HTTPStatus.UNAUTHORIZED
        verified = verifyPassword(password, userDict["password"])

        if verified:
            accessToken = create_access_token(identity=userObj.id)
            refreshToken = create_refresh_token(identity=userObj.id)
            return {"accessToken": accessToken, "refreshToken": refreshToken, "userId": userObj.id}, HTTPStatus.OK
        else:
            return {"msg":"Username or password is incorrect"}, HTTPStatus.UNAUTHORIZED


class LogoutResource(Resource):

    @jwt_required()
    def get(self):
        jti = get_jwt()["jti"]
        jwt_blacklist.add(jti)
        return {"msg": "Logged out successfully."}, HTTPStatus.OK

class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def get(self):
        identity = get_jwt_identity()
        access_token = create_access_token(identity=identity)
        return {"access_token": access_token}, HTTPStatus.OK


