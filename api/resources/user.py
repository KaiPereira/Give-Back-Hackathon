from flask_restful import Resource
from http import HTTPStatus
from flask import request
from api.utils.dbUtils import createUser, getUserFromId
from api.utils.authUtils import hashPassword

class UserCreationResource(Resource):
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

class UserViewResource(Resource):
    def get(self, id):
        user, userRef = getUserFromId(id)
        user.pop("password")
        user.pop("notifs")

        if user["isBusiness"]:
            user.pop("skills")

        return user, HTTPStatus.OK

