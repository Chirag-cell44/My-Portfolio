from django.core.management.base import BaseCommand
from portfolio_app.models import Project,Certification
class Command(BaseCommand):
    def handle(self,*args,**kwargs):
        data=[
        ("AI Chat Assistant","ai-chat-assistant","01","AI / ML","A conversational assistant focused on useful, contextual answers.","Python, NLP, FastAPI"),
        ("Smart Study Platform","smart-study-platform","02","Education","A learning platform for organizing study material and intelligent workflows.","Django, Machine Learning, PostgreSQL"),
        ("Image Classifier","image-classifier","03","Computer Vision","A computer-vision project that classifies images using a trained model.","Python, TensorFlow, CNN")]
        for title,slug,num,cat,desc,tech in data:
            Project.objects.update_or_create(slug=slug,defaults={"title":title,"number":num,"category":cat,"description":desc,"tech_stack":tech,"order":int(num)})
        Certification.objects.get_or_create(title="Add your certification",issuer="Your issuing organization",defaults={"order":1})
        self.stdout.write(self.style.SUCCESS("Starter content created."))
