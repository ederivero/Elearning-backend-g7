from django.urls import path
from .views import ProductoView

urlpatterns = [
    path('productos', ProductoView.as_view())
]