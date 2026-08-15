# Mukteswar Portfolio — Django

## Stack
- Frontend: HTML, CSS, Vanilla JavaScript, Canvas
- Backend: Django 5.2 LTS
- Database: SQLite locally; PostgreSQL-ready
- Admin: Django Admin
- Production: Gunicorn + WhiteNoise

## Setup on Windows / VS Code

```powershell
py -m venv venv
venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
Copy-Item .env.example .env
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_portfolio
python manage.py runserver
```

Open http://127.0.0.1:8000/
Admin: http://127.0.0.1:8000/admin/

## Main files
- `templates/portfolio/home.html` — page structure/content
- `static/css/style.css` — beige/cream visual design and liquid-glass nav
- `static/js/particles.js` — cursor scatter/reform typography
- `static/js/main.js` — navigation glass, active sections and custom cursor
- `portfolio_app/models.py` — projects, certifications, contact messages
- `portfolio_app/views.py` — pages, contact endpoint and JSON APIs
- `portfolio_app/admin.py` — admin content management

## Production
Set `DEBUG=False`, a real `SECRET_KEY`, `ALLOWED_HOSTS`, database/email settings, then run:
`python manage.py collectstatic`
`python manage.py check --deploy`

Do not commit `.env`, credentials, `db.sqlite3`, or private media.

\n## Social links\nThe homepage replaces the Selected Work cards with LinkedIn, GitHub and Instagram visit cards. Replace the placeholder URLs in `templates/portfolio/home.html` with your actual profile/server URLs.\n