from django.urls import path
# es la vista que me brindara las tokens de acceso y fresh 
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('login', TokenObtainPairView.as_view())
]