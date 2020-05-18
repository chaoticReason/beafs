from django.db import models
from django.utils import timezone
from datetime import date

class Profile(models.Model):
    email = models.CharField(unique=True, max_length=40)
    nickname = models.CharField(unique=True, max_length=20)
    password = models.CharField(unique=True, max_length=128)
    created_at = models.DateField(editable=False, null=True)
    gender = models.CharField(default="whatever", max_length=8, blank=True)
    year_birth = models.DateField(null=True, blank=True)
    interests = models.TextField(max_length=30, null=True, blank=True)
    bio = models.TextField(max_length=50, null=True,  blank=True)
    pass

    class Meta:
        app_label = 'entry'

    def __str__(self):
        return self.nickname
