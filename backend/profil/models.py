from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


# Create your models here.

class Sport(models.Model):
    nom=models.CharField(max_length=60)
    professeur=models.CharField(max_length=60)
    president= models.OneToOneField(User, on_delete=models.CASCADE)
    horaire = models.CharField(max_length=60,default='')
    description=models.CharField(max_length=500,default='')

    def __str__(self):
        return str(self.nom)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar= models.ImageField(upload_to='avatars',default='avatar.png')
    background=models.ImageField(upload_to='backgrounds',default='background.jpg')
    following = models.ManyToManyField(Sport,related_name='following',blank=True)
    bio=models.TextField(default="no bio...")
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user)

class Post(models.Model):
    sport=models.ForeignKey(Sport,on_delete=models.CASCADE)
    author=models.ForeignKey(Profile,on_delete=models.CASCADE,default=1)
    body=models.CharField(default='',max_length=1000)
    date = models.DateTimeField(
        default=timezone.now
    )
    def __str__(self):
        return self.body


