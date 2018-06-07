from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

class Task(models.Model):
    title = models.CharField(max_length=64)
    complete = models.BooleanField(default=False)
    # user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

