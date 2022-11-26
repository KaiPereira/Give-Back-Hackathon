from passlib.hash import pbkdf2_sha256

def hashPassword(password):
    return pbkdf2_sha256.hash(password)

def verifyPassword(p1, p2):
    return pbkdf2_sha256.verify(p1, p2)
