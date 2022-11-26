class Config:

    DEBUG = True
    JWT_SECRET_KEY = "super-secret"
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']
