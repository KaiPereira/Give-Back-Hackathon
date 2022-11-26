from flask_jwt_extended import JWTManager
import firebase_admin
from firebase_admin import firestore
# import spacy
# from spacy.matcher import PhraseMatcher
# from skillNer.general_params import SKILL_DB
# from skillNer.skill_extractor_class import SkillExtractor
#
# nlp = spacy.load("en_core_web_lg")
# skillExtractor = SkillExtractor(nlp, SKILL_DB, PhraseMatcher)

jwt = JWTManager()

# hacky solution but it works
try:
    cred = firebase_admin.credentials.Certificate("firebase_key.json")
    firebaseApp = firebase_admin.initialize_app(cred)
except ValueError:
    pass

db = firestore.client()