from django.urls import path
from .views import inicio, PruebaView

# seran todas las rutas que puede ser accedidas a esta aplicacion
urlpatterns = [
    path('inicio',inicio),
    path('prueba', PruebaView.as_view())
]