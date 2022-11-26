import uuid
from api.extensions import db


def createUser(dbData):
    id = str(uuid.uuid4())
    userRef = db.collection("users").document(id)
    userRef.set(dbData)
    return userRef.get().to_dict()

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

