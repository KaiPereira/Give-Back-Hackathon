from flask_restful import Resource
from http import HTTPStatus
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.utils.dbUtils import createUser, getUserFromId, updateDB
from api.utils.authUtils import hashPassword

class UserCreationResource(Resource):

    def post(self):
        try:
            # it's a hackathon bro :)
            data = request.get_json()
            dbData = {
                "username": data["username"],
                "password": hashPassword(data["password"]),
                "isStudent": data["isStudent"],
                "isBusiness": not data["isStudent"],
                "skills": data["skills"],
                "bio": "LocalConnect is so bussin.",
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

    @jwt_required()
    def put(self):
        try:
            data = request.get_json()
            dbData = {
                "skills": data["skills"],
                "bio": data["bio"],
                "location": {
                    "town": data["town"],
                    "province": data["province"],
                    "country": data["country"]
                }
            }
        except KeyError:
            return {"msg": "All or some fields are not provided."}, HTTPStatus.BAD_REQUEST
        updateDB(get_jwt_identity(), dbData)
        user = getUserFromId(get_jwt_identity())[0]
        user.pop("password")
        user.pop("notifs")

        return user, HTTPStatus.OK

class UserViewResource(Resource):
    def get(self, id):
        user, userRef = getUserFromId(id)
        user.pop("password")
        user.pop("notifs")

        if user["isBusiness"]:
            user.pop("skills")

        return user, HTTPStatus.OK

