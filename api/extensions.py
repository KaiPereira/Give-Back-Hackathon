from flask_jwt_extended import JWTManager
import firebase_admin
from firebase_admin import firestore

jwt = JWTManager()

# hacky solution but it works
try:
    cred = firebase_admin.credentials.Certificate("firebase_key.json")
    firebaseApp = firebase_admin.initialize_app(cred)
except ValueError:
    pass

db = firestore.client()