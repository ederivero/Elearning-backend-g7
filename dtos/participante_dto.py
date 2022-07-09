from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models.participante import Participante


class ParticipanteResponseDTO(SQLAlchemyAutoSchema):
    # clase Meta > sirve como el super() para setear los atributos de la clase padre de la cual estoy heredando
    class Meta:
        # sirve para indicar que modelo voy a utilizar para hacer todo lo relacionado con la serializacion y deserializacion del modelo
        model = Participante


class ParticipanteRequestDTO(SQLAlchemyAutoSchema):
    class Meta:
        model = Participante
