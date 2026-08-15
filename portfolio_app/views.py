from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import redirect,render
from django.contrib import messages
from .forms import ContactForm
from .models import Project,Certification
def home(request):
    return render(request,"portfolio/home.html",{"projects":Project.objects.filter(featured=True),"certifications":Certification.objects.all()})
def contact(request):
    if request.method!="POST": return redirect("home")
    form=ContactForm(request.POST)
    if form.is_valid():
        obj=form.save()
        if settings.CONTACT_EMAIL:
            send_mail(f"Portfolio contact: {obj.subject or 'New message'}",f"Name: {obj.name}\nEmail: {obj.email}\n\n{obj.message}",settings.DEFAULT_FROM_EMAIL,[settings.CONTACT_EMAIL],fail_silently=True)
        messages.success(request,"Thanks — your message has been sent.")
    else: messages.error(request,"Please check the form and try again.")
    return redirect("/#contact")
def projects_api(request):
    return JsonResponse({"projects":[{"title":p.title,"slug":p.slug,"number":p.number,"category":p.category,"description":p.description,"technologies":p.technologies,"project_url":p.project_url,"github_url":p.github_url} for p in Project.objects.filter(featured=True)]})
def certifications_api(request):
    return JsonResponse({"certifications":[{"title":c.title,"issuer":c.issuer,"issue_date":c.issue_date.isoformat() if c.issue_date else None,"credential_url":c.credential_url,"description":c.description} for c in Certification.objects.all()]})
