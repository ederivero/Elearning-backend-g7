# Conjunto (Set)
# coleccion de dato desordenada (no lleva orden en los indices) es editable y sirve para guardar valores que solamente podremos comprobar si hay o no hay en ese conjunto

meses = {'enero', 'febrero', 'marzo', 'abril'}
print(meses)
print('enero' in meses)
print('agosto' in meses)

# se puede agregar nuevos elementos
meses.add('mayo')
meses.add('junio')

print(meses)

# tbn se puede agregar un conjunto de nuevos elementos
meses.update(['julio','agosto', 'septiembre', 'junio', 'julio'])
print(meses)
# el metodo discard o remove elimina todos los valores que coincidan con ese contenido
meses.discard('junio')
print(meses)

meses.remove('julio')
print(meses)
