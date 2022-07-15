from django.db import models

class Tarea(models.Model):
    # TIPOS DE DATOS > https://docs.djangoproject.com/en/4.0/ref/models/fields/#field-types
    # OPCIONES DE LAS COLUMNAS > https://docs.djangoproject.com/en/4.0/ref/models/fields/#field-options
    estadoOpciones = [('POR_HACER', 'POR_HACER'), ('HACIENDO', 'HACIENDO'), ('HECHO', 'HECHO')]

    id = models.AutoField(primary_key=True, unique=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(null=True)
    fechaVencimiento = models.DateTimeField(db_column='fecha_vecimiento')
    estado = models.CharField(choices=estadoOpciones, max_length=10, default='POR_HACER')

    class Meta:
        # https://docs.djangoproject.com/en/4.0/ref/models/options/
        db_table = 'tareas'
        # el ordenamiento sera de manera descendente por la columna fecha_vencimiento
        ordering = ['-fechaVencimiento']
        