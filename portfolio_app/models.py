from django.db import models
class Project(models.Model):
    title=models.CharField(max_length=120); slug=models.SlugField(unique=True); number=models.CharField(max_length=10,default="01"); category=models.CharField(max_length=80,default="Software"); description=models.TextField(blank=True); tech_stack=models.CharField(max_length=255); project_url=models.URLField(blank=True); github_url=models.URLField(blank=True); image_url=models.URLField(blank=True); featured=models.BooleanField(default=True); order=models.PositiveIntegerField(default=0)
    class Meta: ordering=["order","id"]
    def __str__(self): return self.title
    @property
    def technologies(self): return [x.strip() for x in self.tech_stack.split(",") if x.strip()]
class Certification(models.Model):
    title=models.CharField(max_length=150); issuer=models.CharField(max_length=120); issue_date=models.DateField(null=True,blank=True); credential_url=models.URLField(blank=True); description=models.TextField(blank=True); order=models.PositiveIntegerField(default=0)
    class Meta: ordering=["order","-issue_date","id"]
    def __str__(self): return self.title
class ContactMessage(models.Model):
    name=models.CharField(max_length=120); email=models.EmailField(); subject=models.CharField(max_length=180,blank=True); message=models.TextField(); created_at=models.DateTimeField(auto_now_add=True); is_read=models.BooleanField(default=False)
    class Meta: ordering=["-created_at"]
    def __str__(self): return f"{self.name} — {self.email}"
