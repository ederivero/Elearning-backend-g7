from django.urls import path
from .views import ListProductosView, CreateProductosView, CategoriasView

urlpatterns = [
    path('productos/list', ListProductosView.as_view()),
    path('productos/create', CreateProductosView.as_view()),
    path('categorias', CategoriasView.as_view())
]