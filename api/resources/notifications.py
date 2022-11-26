from flask_restful import Resource
from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from api.utils.dbUtils import getUserFromId, removeNotifFromUser
from http import HTTPStatus

class NotificationResource(Resource):

    @jwt_required()
    def get(self):
        user, userObj = getUserFromId(get_jwt_identity())
        notifs = user["notifs"]

        for i in range(len(notifs)):
            cur = notifs[i]
            cur = cur.get().to_dict()
            cur["id"] = notifs[i].id
            notifs[i] = cur

        return {"notifs": notifs}, HTTPStatus.OK

class ReadNotificationResource(Resource):
    @jwt_required()
    def get(self, notifId):
        user, userObj = getUserFromId(get_jwt_identity())
        removeNotifFromUser(userObj.id, notifId)
        return {"msg": "Successfully read."}, HTTPStatus.OK
