from decouple import config

DJANGO_SECRET_KEY: str = config('DJANGO_SECRET_KEY')

# database
PG_DB_HOST: str = config('PG_DB_HOST', default='postgres')
PG_DB_PORT: int = config('PG_DB_PORT', cast=int, default=5432)
PG_DB_USER: str = config('PG_DB_USER')
PG_DB_PASSWORD: str = config('PG_DB_PASSWORD')
PG_DB_NAME: str = config('PG_DB_NAME')

API_AI_KEY: str = config('API_AI_KEY')

DEBUG: bool = config('DEBUG', default=False, cast=bool)