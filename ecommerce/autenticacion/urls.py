from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import MiTokenView, RegistroView

urlpatterns = [
    path('login', MiTokenView.as_view()),
    path('register', RegistroView.as_view())
]