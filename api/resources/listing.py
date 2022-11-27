from flask_restful import Resource
from flask import request
from http import HTTPStatus
from flask_jwt_extended import get_jwt_identity, jwt_required
from utils.dbUtils import getUserFromId, createListing, getAllByUserRef, createNotif, getListingFromId, getRecommendedListings
from ml import skill_get

class ListingResource(Resource):

    @jwt_required()
    def post(self):
        try:
            data = request.get_json()
            title = data["title"]
            desc = data["desc"]
        except KeyError:
            return {"msg": "All or some of the fields are not provided."}, HTTPStatus.BAD_REQUEST

        user, userRef = getUserFromId(get_jwt_identity())

        if user["isStudent"]:
            return {"msg": "You are not allowed to view this page."}, HTTPStatus.FORBIDDEN

        skills = skill_get(desc)

        location = {
            "city": user["location"]["city"],
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

class ListingViewResource(Resource):
    def get(self, listingId):
        listing, listingRef = getListingFromId(listingId)
        if not listing:
            return {"msg": "Listing not found."}, HTTPStatus.NOT_FOUND

        listing["author"] = listing["author"].get().to_dict()
        listing["author"].pop("password")
        listing["author"].pop("notifs")
        listing["author"].pop("skills")

        return listing, HTTPStatus.OK

class MyListingResource(Resource):

    @jwt_required()
    def get(self):
        user, userRef = getUserFromId(get_jwt_identity())
        if user["isStudent"]:
            return {"msg": "You are not allowed to access this page."}, HTTPStatus.FORBIDDEN
        listingData = getAllByUserRef(userRef)
        return {"data": listingData[0]}, HTTPStatus.OK

class RequestListingResource(Resource):

    @jwt_required()
    def post(self, listingId):
        user, userRef = getUserFromId(get_jwt_identity())

        if user["isBusiness"]:
            return {"msg": "You are not allowed to access this page."}, HTTPStatus.FORBIDDEN

        try:
            data = request.get_json()
            dbData = {
                "title": data["title"],
                "desc": data["desc"],
                "sentFrom": userRef.id
            }
        except KeyError:
            return {"msg": "All or some of the fields are not provided."}, HTTPStatus.BAD_REQUEST

        try:
            targetUser = getListingFromId(listingId)[0]["author"].id
        except TypeError:
            return {"msg": "Invalid listing id."}, HTTPStatus.BAD_REQUEST
        createNotif(targetUser, dbData)

        return {"msg": "Request successfully created."}, HTTPStatus.CREATED

class ListingDiscoverResource(Resource):

    @jwt_required()
    def get(self):
        user, userRef = getUserFromId(get_jwt_identity())

        if user["isBusiness"]:
            return {"msg": "You are not allowed to access this page."}, HTTPStatus.FORBIDDEN

        return getRecommendedListings(user), HTTPStatus.OK
