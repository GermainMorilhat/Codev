from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile,Sport

class ProfilSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(many=False)

    class Meta:
        model = Profile
        fields = ('id', 'user', 'bio','following')

