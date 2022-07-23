from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User


class MiTokenSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MiTokenSerializer, cls).get_token(user)
        return token


class RegistroSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(write_only=True, required=True)
    username = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['email','password','username']

    def create(self, validated_data):
        usuario = User.objects.create(
            email=validated_data['email'],
            password=validated_data['password'],
            username=validated_data['username']
        )

        usuario.set_password(validated_data['password'])
        usuario.save()

        return usuario