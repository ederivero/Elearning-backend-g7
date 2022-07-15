from rest_framework import serializers

class PruebaSerializer(serializers.Serializer):
    nombre = serializers.CharField(max_length= 40)
    apellido = serializers.CharField(max_length=40)