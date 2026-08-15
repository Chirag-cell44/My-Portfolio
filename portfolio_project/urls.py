from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from portfolio_app import views
urlpatterns=[path("admin/",admin.site.urls),path("",views.home,name="home"),path("contact/",views.contact,name="contact"),path("api/projects/",views.projects_api,name="projects_api"),path("api/certifications/",views.certifications_api,name="certifications_api")]
if settings.DEBUG: urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
