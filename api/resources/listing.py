from flask_restful import Resource
from flask import request
from http import HTTPStatus
from flask_jwt_extended import get_jwt_identity, jwt_required
from api.utils.dbUtils import getUserFromId, createListing
from api.ml import skill_get

class CreateListingResource(Resource):

    @jwt_required()
    def post(self):
        try:
            data = request.get_json()
            title = data["title"]
            desc = data["desc"]
        except KeyError:
            return {"msg": "All or none of the fields are not provided."}, HTTPStatus.BAD_REQUEST

        user, userRef = getUserFromId(get_jwt_identity())
        skills = skill_get(desc)
        print(user)
        location = {
            "town": user["location"]["town"],
            "province": user["location"]["province"],
            "country": user["location"]["country"]
        }
        author = userRef

        listing = createListing({
            "title": title,
            "desc": desc,
            "author": author,
            "location": location,
            "skills": skills
        })
        listing.pop("author")
        return listing, HTTPStatus.CREATED

