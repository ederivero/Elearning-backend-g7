from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.generics import ListAPIView, ListCreateAPIView
from .serializers import PruebaSerializer, TareaSerializer
from .models import Tarea
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

@api_view(http_method_names=['GET', 'POST'])
def inicio(request: Request):
    # request > me dara toda la informacion del cliente que me hace la peticion
    print(request)
    return Response(data={
        'message': 'Endpoint de un decorador'
    })

class PruebaView(ListAPIView):
    # en cualquiera de las clases genericas se necesita declarar los atributos 
    # queryset > resultado de la consulta de nuestra iteraccion con nuestro ORM y este se usa para los metodos de devolucion (GET)
    queryset = [{
        'nombre': 'eduardo',
        'apellido':'de rivero'
    },{
        'nombre': 'roxana',
        'apellido': 'gonzales'
    }]
    # serializador es un DTO (Data Transfer Object)
    # serializer_class > lo que va a convertir la informacion que llega desde el cliente y tbn la informacion que retornaremos hacia el cliente
    serializer_class = PruebaSerializer

# admitir un GET y un POST
class TareasView(ListCreateAPIView):
    queryset = Tarea.objects.all() # SELECT * FROM tareas;
    serializer_class = TareaSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request: Request):
        # cuando se modifica el metodo por algun comportamiento diferente entonces DRF ya ahora obedecera a este comportamiento y es ahi cuando ya podemos dejar de utilizar los atributos queryset y serializer_class
        # primero traigo las tareas
        # get_queryset() > manda a llamar a la ejecucion de nuestro queryset
        usuarioId = request.user.id
        # SELECT * FROM TAREAS WHERE usuario_id = ....;
        tareas = Tarea.objects.filter(usuarioId = usuarioId).all()
        # luego lo paso al serializador para convertirlas a tipos de datos genericos
        tareasSerializada = self.serializer_class(instance=tareas, many=True)

        return Response(data={
            'message':'Las tareas son', 
            'content': tareasSerializada.data
        },status=status.HTTP_200_OK)
    

    def post(self, request: Request):
        body = request.data # body
        # request.user > devolvera toda la instancia del usuario que esta en la token (basandose en su ID) si no hay un usuario entonces sera un AnonymousUser 
        print(request.user.nombre)
        body['usuarioId'] = request.user.id # modifico el body entrante y le agrego el ID del usuario que actualmente esta haciendo la peticion
        instanciaSerializador = self.serializer_class(data=body)
        validacion = instanciaSerializador.is_valid(raise_exception=True) # me retornara True si es valida, si no es valida emitira un error
        if validacion == True:
            # save > guarda la informacion en la base de datos
            instanciaSerializador.save()

            return Response(data=instanciaSerializador.data, status=status.HTTP_201_CREATED)            