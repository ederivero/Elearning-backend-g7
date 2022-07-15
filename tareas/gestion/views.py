from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.generics import ListAPIView

from .serializers import PruebaSerializer

@api_view(http_method_names=['GET', 'POST'])
def inicio(request: Request):
    # request > me dara toda la informacion del cliente que me hace la peticion
    print(request)
    return Response(data={
        'message': 'Endpoint de un decorador'
    })

class PruebaView(ListAPIView):
    # en cualquiera de las clases genericas se necesita declarar los atributos 
    queryset = [{
        'nombre': 'eduardo',
        'apellido':'de rivero'
    },{
        'nombre': 'roxana',
        'apellido': 'gonzales'
    }]
    # serializador es un DTO (Data Transfer Object)
    serializer_class = PruebaSerializer
