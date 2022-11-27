import uuid
from extensions import db
from firebase_admin import firestore
from utils.preprocessUtils import preprocessListing, preprocessUser

def createUser(dbData):
    id = str(uuid.uuid4())
    userRef = db.collection("users").document(id)
    userRef.set(dbData)
    return userRef.get().to_dict(), id

def getUserFromUsername(username):
    doc = db.collection("users").where("username", "==", username).get()
    if not doc:
        return None, None
    return doc[0].to_dict(), doc[0]

def getUserFromId(id):
    doc = db.collection("users").document(id)
    if not doc:
        return None, None
    return doc.get().to_dict(), doc

def createListing(dbData):
    id = str(uuid.uuid4())
    listingRef = db.collection("listings").document(id)
    listingRef.set(dbData)
    return listingRef.get().to_dict()

def getListingFromId(id):
    doc = db.collection("listings").document(id)
    if not doc:
        return None, None
    return doc.get().to_dict(), doc

def getAllByUserRef(userRef):
    docs = db.collection("listings").where("author", "==", userRef).get()
    if not docs:
        return None, None
    dictDocs = [i.to_dict() for i in docs]
    for i in dictDocs:
        i["author"] = preprocessUser(i["author"].get().to_dict())
    return dictDocs, docs

def addNotifToUser(userId, notifRef):
    doc = db.collection("users").document(userId)
    doc.update({
        "notifs": firestore.ArrayUnion([notifRef])
    })

    return True

def createNotif(recUserId, dbData):
    notifId = str(uuid.uuid4())
    doc = db.collection("notifications").document(notifId)
    doc.set(dbData)
    addNotifToUser(recUserId, doc)
    return db.collection("notifications").document(notifId).get().to_dict()

def removeNotifFromUser(userId, notifId):
    notifRef = db.collection("notifications").document(notifId)
    doc = db.collection("users").document(userId)

    doc.update({
        "notifs": firestore.ArrayRemove([notifRef])
    })

    return True

def updateDB(userId, dbData):
    doc = db.collection("users").document(userId)
    doc.update(dbData)
    return True

def getRecommendedListings(user):

    skills = user["skills"]
    location = user["location"]
    
    if not skills:
        return [preprocessListing(i) for i in list(db.collection("listings").stream())]

    query = list(db.collection("listings").where(
        "skills", "array_contains_any", skills
    ).where("location", "==", location).stream())

    if not query:
        query = list(db.collection("listings").where(
            "skills", "array_contains_any", skills
        ).stream())

        if not query:
            query = list(db.collection("listings").stream())

    return [preprocessListing(i) for i in query]
