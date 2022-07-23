from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import MiTokenSerializer, RegistroSerializer

# Create your views here.
class MiTokenView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MiTokenSerializer


class RegistroView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegistroSerializer
    permission_classes = (AllowAny,)