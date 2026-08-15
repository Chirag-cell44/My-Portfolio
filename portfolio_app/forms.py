from django import forms
from .models import ContactMessage
class ContactForm(forms.ModelForm):
    website=forms.CharField(required=False,widget=forms.HiddenInput)
    class Meta:
        model=ContactMessage
        fields=["name","email","subject","message"]
        widgets={"name":forms.TextInput(attrs={"placeholder":"Your name"}),"email":forms.EmailInput(attrs={"placeholder":"you@example.com"}),"subject":forms.TextInput(attrs={"placeholder":"What would you like to build?"}),"message":forms.Textarea(attrs={"placeholder":"Tell me a little about your idea...","rows":6})}
    def clean_website(self):
        if self.cleaned_data.get("website"): raise forms.ValidationError("Spam detected.")
        return ""
