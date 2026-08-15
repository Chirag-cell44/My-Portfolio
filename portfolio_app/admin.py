from django.contrib import admin
from .models import Project,Certification,ContactMessage
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display=("number","title","category","featured","order"); list_filter=("featured","category"); search_fields=("title","description","tech_stack"); prepopulated_fields={"slug":("title",)}; list_editable=("featured","order")
@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display=("title","issuer","issue_date","order"); search_fields=("title","issuer"); list_editable=("order",)
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display=("name","email","subject","created_at","is_read"); list_filter=("is_read","created_at"); search_fields=("name","email","subject","message"); readonly_fields=("created_at",); list_editable=("is_read",)
