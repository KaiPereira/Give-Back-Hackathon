from flask_restful import Resource
from http import HTTPStatus
from flask import request
from api.utils.dbUtils import createUser, getUserFromUsername
from api.utils.authUtils import hashPassword, verifyPassword
from flask_jwt_extended import (get_jwt_identity,
                                jwt_required,
                                get_jwt,
                                create_access_token,
                                create_refresh_token)
jwt_blacklist = set()

class UserResource(Resource):
    def get(self, id):
        pass


    def post(self):
        try:
            # it's a hackathon bro
            data = request.get_json()
            dbData = {
                "username": data["username"],
                "password": hashPassword(data["password"]),
                "isStudent": data["isStudent"],
                "isBusiness": not data["isStudent"],
                "skills": data["skills"],
                "notifs": [],
                "location": {
                    "town": data["town"],
                    "province": data["province"],
                    "country": data["country"]
                }
            }

        except KeyError:
            return {"msg": "All or none of the fields are not provided."}, HTTPStatus.BAD_REQUEST
        user = createUser(dbData)
        user.pop("password")
        user.pop("location")
        user.pop("notifs")

        return user, HTTPStatus.CREATED

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
            return {"accessToken": accessToken, "refreshToken": refreshToken}, HTTPStatus.OK
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


