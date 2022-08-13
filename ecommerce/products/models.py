from django.db import models

# Create your models here.
class Categorias(models.Model):
    categoriaId = models.AutoField(primary_key=True)
    categoriaNombre = models.CharField(max_length=200)
    categoriaDescripcion = models.CharField(max_length=200)
    estado = models.BooleanField(default=True, null=True)

    class Meta:
        db_table = "categorias"


class Preferencias(models.Model):
    preferenciaId = models.AutoField(primary_key=True)
    preferenciaNombre = models.CharField(max_length=200)
    estado = models.BooleanField(default=True, null=True)

    class Meta:
        db_table = "preferencias"


class Productos(models.Model):
    productoId = models.AutoField(primary_key=True)
    productoNombre = models.CharField(max_length=200, null=False)
    productoDescripcion = models.CharField(max_length=200)
    productoPrecio = models.DecimalField(max_digits=5, decimal_places=2)
    productoImagen = models.TextField(default="https://www.google.com")
    estado = models.BooleanField(default=True, null=True)
    categoriaId = models.ForeignKey(
        Categorias, on_delete=models.CASCADE, related_name="ProductosCategoria"
    )
    preferenciaId = models.ForeignKey(
        Preferencias, on_delete=models.CASCADE, related_name="ProductosPreferencia", default=1
    )

    class Meta:
        db_table = "productos"


class Ventas(models.Model):
    pass
