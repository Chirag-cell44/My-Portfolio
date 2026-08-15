from django.test import TestCase
from .models import Project
class PortfolioTests(TestCase):
    def setUp(self): Project.objects.create(title="Test Project",slug="test-project",number="01",category="AI / ML",tech_stack="Python,Django",featured=True)
    def test_home(self): self.assertEqual(self.client.get("/").status_code,200)
    def test_api(self): self.assertEqual(self.client.get("/api/projects/").status_code,200)
