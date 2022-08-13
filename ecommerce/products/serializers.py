from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import Productos, Categorias, Preferencias


class CategoriasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorias
        exclude = ["estado"]


class PreferenciasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preferencias
        exclude = ["estado"]


class ListProductosSerializer(serializers.ModelSerializer):
    categoria = CategoriasSerializer(read_only=True, source="categoriaId")
    preferencia = PreferenciasSerializer(read_only=True, source="preferenciaId")

    class Meta:
        model = Productos
        exclude = ["categoriaId", "preferenciaId", "estado"]


class CreateProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = "__all__"
