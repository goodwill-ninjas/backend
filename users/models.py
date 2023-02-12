from django.db import models
from django_extensions.db.models import TimeStampedModel


class User(TimeStampedModel):
    email = models.EmailField('email address', unique=True)
    username = models.CharField(max_length=64, unique=True)
    password_hash = models.CharField(max_length=255)
