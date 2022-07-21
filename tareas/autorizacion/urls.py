from django.urls import path
# es la vista que me brindara las tokens de acceso y fresh 
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView


urlpatterns = [
    path('login', TokenObtainPairView.as_view()),
    path('register', RegisterView.as_view()),
    path('refresh', TokenRefreshView.as_view()),
]