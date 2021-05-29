from django.shortcuts import render
from .models import Profile,Sport,Post
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from . import serializers
from rest_framework.decorators import action
from rest_framework.response import Response
from .permissions import ReadOnly
from django.http import HttpResponse,JsonResponse
import json


class ProfilViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ProfilSerializer
    def get_queryset(self):
        id = self.kwargs['id']
        return Profile.objects.filter(id=id)

def subscribe(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    sport = body['sport']
    user_id=body['user_id']
    current_user=Profile.objects.get(id=user_id)
    sport=Sport.objects.get(id=int(sport))
    current_user.following.add(sport)
    return JsonResponse('',safe=False)


def unsubscribe(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    sport = body['sport']
    user_id=body['user_id']
    current_user=Profile.objects.get(id=user_id)
    sport=Sport.objects.get(id=int(sport))
    current_user.following.remove(sport)
    return JsonResponse('',safe=False)

def prez(request):
    sports=Sport.objects.all()
    Liste={}
    for sport in sports:
        Liste[sport.id]=sport.president.id
    return JsonResponse(Liste, safe=False)
    
def sport_page(request,sport_name):
    Data={}
    Data['name']=sport_name.capitalize()
    sport=Sport.objects.get(nom=sport_name)
    Data['professeur']=sport.professeur
    Data['president']=sport.president.id
    Data['Horaire']=sport.horaire
    Data['Description']=sport.description
    Data['posts']={}
    posts=Post.objects.filter(sport=sport.id)
    for post in posts:
        Data['posts'][post.id]=[post.body,post.author.id,post.date]

    print(Data)
    return JsonResponse(Data,safe=False)

def posts(request):
    body={}
    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
    except ValueError:  # includes simplejson.decoder.JSONDecodeError
        print('Decoding JSON has failed') 
    print(body['post']['body'])
    current_sport=Sport.objects.get(id=body['sport_id'])
    current_author=Profile.objects.get(id=body['author_id'])
    new_post=Post(sport=current_sport,author=current_author,body=body['post']['body'])
    new_post.save()
    return JsonResponse('',safe=False)