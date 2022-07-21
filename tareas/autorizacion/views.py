from django.shortcuts import render
from rest_framework import generics 
from .serializers import RegisterSerializer
from .models import Usuario

# Create your views here.
class RegisterView(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = RegisterSerializer