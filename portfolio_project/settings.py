import dj_database_url
from pathlib import Path
import os
BASE_DIR=Path(__file__).resolve().parent.parent
SECRET_KEY = os.environ.get(
    "SECRET_KEY",
    "django-development-only-secret-key"
)
DEBUG=os.getenv("DEBUG","True").lower()=="true"
ALLOWED_HOSTS=[x.strip() for x in os.getenv("ALLOWED_HOSTS","127.0.0.1,localhost").split(",") if x.strip()]
INSTALLED_APPS=["django.contrib.admin","django.contrib.auth","django.contrib.contenttypes","django.contrib.sessions","django.contrib.messages","django.contrib.staticfiles","portfolio_app"]
MIDDLEWARE=["django.middleware.security.SecurityMiddleware","whitenoise.middleware.WhiteNoiseMiddleware","django.contrib.sessions.middleware.SessionMiddleware","django.middleware.common.CommonMiddleware","django.middleware.csrf.CsrfViewMiddleware","django.contrib.auth.middleware.AuthenticationMiddleware","django.contrib.messages.middleware.MessageMiddleware","django.middleware.clickjacking.XFrameOptionsMiddleware"]
ROOT_URLCONF="portfolio_project.urls"
TEMPLATES=[{"BACKEND":"django.template.backends.django.DjangoTemplates","DIRS":[BASE_DIR/"templates"],"APP_DIRS":True,"OPTIONS":{"context_processors":["django.template.context_processors.request","django.contrib.auth.context_processors.auth","django.contrib.messages.context_processors.messages"]}}]
WSGI_APPLICATION="portfolio_project.wsgi.application"
ASGI_APPLICATION="portfolio_project.asgi.application"
ENGINE=os.getenv("DB_ENGINE","django.db.backends.sqlite3")
if ENGINE=="django.db.backends.sqlite3":
    DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    DATABASES = {
        "default": dj_database_url.parse(
            DATABASE_URL,
            conn_max_age=600,
            conn_health_checks=True,
        )
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
AUTH_PASSWORD_VALIDATORS=[{"NAME":"django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},{"NAME":"django.contrib.auth.password_validation.MinimumLengthValidator"},{"NAME":"django.contrib.auth.password_validation.CommonPasswordValidator"},{"NAME":"django.contrib.auth.password_validation.NumericPasswordValidator"}]
LANGUAGE_CODE="en-us"; TIME_ZONE="Asia/Kolkata"; USE_I18N=True; USE_TZ=True
STATIC_URL="/static/"; STATICFILES_DIRS=[BASE_DIR/"static"]; STATIC_ROOT=BASE_DIR/"staticfiles"; STATICFILES_STORAGE="whitenoise.storage.CompressedManifestStaticFilesStorage"
MEDIA_URL="/media/"; MEDIA_ROOT=BASE_DIR/"media"
DEFAULT_AUTO_FIELD="django.db.models.BigAutoField"
EMAIL_BACKEND="django.core.mail.backends.smtp.EmailBackend" if os.getenv("EMAIL_HOST") else "django.core.mail.backends.console.EmailBackend"
EMAIL_HOST=os.getenv("EMAIL_HOST",""); EMAIL_PORT=int(os.getenv("EMAIL_PORT","587")); EMAIL_HOST_USER=os.getenv("EMAIL_HOST_USER",""); EMAIL_HOST_PASSWORD=os.getenv("EMAIL_HOST_PASSWORD",""); EMAIL_USE_TLS=os.getenv("EMAIL_USE_TLS","True").lower()=="true"
DEFAULT_FROM_EMAIL=os.getenv("DEFAULT_FROM_EMAIL","portfolio@localhost"); CONTACT_EMAIL=os.getenv("CONTACT_EMAIL","")
SECURE_CONTENT_TYPE_NOSNIFF=True; X_FRAME_OPTIONS="DENY"; SECURE_REFERRER_POLICY="strict-origin-when-cross-origin"
if not DEBUG:
    SECURE_SSL_REDIRECT=True; SESSION_COOKIE_SECURE=True; CSRF_COOKIE_SECURE=True; SECURE_HSTS_SECONDS=31536000
