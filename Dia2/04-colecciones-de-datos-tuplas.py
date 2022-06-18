# tuplas son colecciones de datos ordenadas PERO no editables
profesores = ('EDUARDO', 'OSMAR')

print(profesores[0])

# profesores[0] = 'XIMENA'
# profesores.append('RAUL')

data = (1,True, 'JUNIO', 14.5, [1,2,3,4])

print(data[1:4])

# se puede eliminar toda la variable pero no se puede eliminar parte del contenido de la tupla
del data

notas = (10,15,15,18,10,5,7,14)
#count > sirve para contar las veces que se repite cierto valor
print(notas.count(10))
print(notas.count(20))
print(notas.count('Onomatopeya'))

# index > si existe ese valor en la tupla me retornara la posicion en la que se encuenta, sino existe me emitira un error
print(notas.index(15))

# TODO: como se podria mostrar todas las posiciones del numero 15 (esta en la posicion 1 y 2)