from wsgiref.validate import validator
from rest_framework import serializers
from .models import Usuario
from rest_framework.validators import UniqueValidator


class RegisterSerializer(serializers.ModelSerializer):

    correo = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=Usuario.objects.all())])
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Usuario
        fields = ('nombre', 'apellido', 'correo', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError('Las contraseñas no coinciden')
        return attrs


    def create(self, validated_data):
        usuario = Usuario.objects.create(
            nombre=validated_data['nombre'],
            apellido=validated_data['apellido'],
            correo=validated_data['correo'],
            password=validated_data['password']
        )

        usuario.set_password(validated_data['password'])
        usuario.save()

        return usuario