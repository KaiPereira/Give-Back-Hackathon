from flask_restful import Resource
from flask import request
from http import HTTPStatus
from flask_jwt_extended import jwt_required

class TestEndpoint(Resource):
    def get(self):
        return {"msg": "Response"}, HTTPStatus.OK

    def post(self):
        data = request.get_json()
        return {"data": data["dummyData"], "msg": "Response"}, HTTPStatus.OK

class ProtectedTestEndpoint(Resource):

    @jwt_required()
    def get(self):
        return {"msg": "Response"}, HTTPStatus.OK
