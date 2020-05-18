from django import forms
from entry.models import Profile

class ChangePsw(forms.Form):
    old_psw = forms.CharField(max_length=128, label='old password', widget=forms.PasswordInput(attrs={'class' : 'psw-input'}))
    new_psw = forms.CharField(max_length=128, label='new password', widget=forms.PasswordInput(attrs={'class' : 'psw-input'}))
    conf_psw = forms.CharField(max_length=128, label='repeat', widget=forms.PasswordInput(attrs={'class' : 'psw-input'}))
