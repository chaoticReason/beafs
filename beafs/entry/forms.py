from django import forms
from django.shortcuts import redirect
from .models import Profile

class LogInForm(forms.Form):
    class Meta:
        model = Profile
        fields = ('email', 'password',)

class SignUpForm(forms.Form):
    auth = forms.CharField(max_length=128, help_text='repeat password')
    class Meta:
        model = Profile
        fields = ('nickname', 'email', 'password',)
