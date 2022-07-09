from flask_restful import Resource, request
from config import conexion
from models.participante import Participante
from dtos.participante_dto import ParticipanteResponseDTO, ParticipanteRequestDTO


# los tipos de datos que se pueden retornar son String, Int, Boolean, Arreglos y Listas, Diccionarios
class ParticipanteController(Resource):
    # esta clase se comportara como si fuede un controlador, es decir que si definimos un metodo llamado get
    def get(self):
        # SELECT * FROM PARTICIPANTES;
        # https://docs.sqlalchemy.org/en/14/orm/query.html
        # https://docs.sqlalchemy.org/en/14/orm/query.html#sqlalchemy.orm.Query.all
        resultado = conexion.session.query(Participante).all()
        # many = True > indico que estoy pasando una lista de instancias por lo que el DTO va a tener que iterar esa lista y transformarlas en un diccionario
        participantesSerializados = ParticipanteResponseDTO().dump(resultado, many=True)
        # me retornara una lista de instancias de la clase del modelo en la cual puedo acceder a cada una de ellas a sus atributos y metodos (si hubiesen)
        print(resultado[0].zona)
        participantes = []

        for participante in resultado:
            participantes.append({
                'id': participante.id,
                'nombre': participante.nombre
                # ...
            })

        return {
            'message': 'Ingreso al get',
            'content': participantes,
            'content2': participantesSerializados
        }

    def post(self):
        # cuando se retorna una tupla la primera posicion sera el body y la segunda posicion sera el estado de respuesta
        print(request.get_json())
        data = request.get_json()
        try:
            # Intenta realizar todo esto
            data_serializada = ParticipanteRequestDTO().load(data)
            print(data_serializada)
            # **data_serializada > convertimos ese diccionario en parametros
            # { 'nombre': 'fabio' } > nombre = 'fabio'
            nuevoParticipante = Participante(**data_serializada)
            # empezamos una nueva transaccion
            conexion.session.add(nuevoParticipante)
            # una vez que queremos guardar de manera permanente los cambios (insercion actualizacion o eliminacion) de los registros haremos un commit
            conexion.session.commit()
            print('se agrego el participante')
            return {
                'message': 'Participante agregado exitosamente'
            }
        except Exception as e:
            # si fallas entonces entraras al except (se emitira una exception)
            # para  deshacer los cambios de la transaccion hacemos uso del rollback lo que dejara sin efecto todos los cambios de los registros que realicemos
            conexion.session.rollback()
            return {
                'message': 'Error al ingresar el participante',
                'content': e.args
            }
