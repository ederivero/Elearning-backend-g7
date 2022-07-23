from django.db import models

# Create your models here.
class Productos(models.Model):
    productoId = models.AutoField(primary_key=True)
    productoNombre = models.CharField(max_length=200, null=False)
    estado = models.BooleanField(default=True, null=True)
    productoDescripcion = models.CharField(max_length=200)
    productoPrecio = models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        db_table = 'productos'