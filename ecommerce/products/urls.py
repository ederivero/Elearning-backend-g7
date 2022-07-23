from django.urls import path
from .views import ProductosView, CategoriasView

urlpatterns = [
    path('productos', ProductosView.as_view()),
    path('categorias', CategoriasView.as_view())
]