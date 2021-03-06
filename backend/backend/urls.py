"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import include
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
from . import views
from profil import views as profil_views
from rest_framework.decorators import action



router = routers.DefaultRouter(trailing_slash=False)
router.register(r'profil/(?P<id>.+)/$', profil_views.ProfilViewSet,basename='Profil')


urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'api-token-auth/', obtain_jwt_token),
    path(r'api-token-refresh/', refresh_jwt_token),
    path(r'', include(router.urls)),
    path('subscription/',profil_views.subscribe),
    path('unsubscription/',profil_views.unsubscribe),
    path('prez/',profil_views.prez),
    path('sports/<str:sport_name>/',profil_views.sport_page),
    path('posts/',profil_views.posts)


]