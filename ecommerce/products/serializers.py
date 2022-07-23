from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import Productos, Categorias

class ProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = '__all__'

class CategoriasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorias
        fields = '__all__'