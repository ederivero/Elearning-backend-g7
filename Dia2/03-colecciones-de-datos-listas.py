# Listas
alumnos = ['JAVIER', 'ALEJANDRO', 'ALEXANDRA', 'JENNY', 'EDUARDO']

otra = [1,10,'hola', True, 5.2, None]

# Son colecciones de datos ordenadas (posiciones) , las posiciones siempre empiezan en 0

print(alumnos[0])
# si queremos acceder a una posicion que no existe en nuestra lista esta nos emitira un error, a diferencia de JS que me muestra 'undefined'
# print(alumnos[10])

variados = [10, [1, 2, 3]]
print(variados[1][1])

# cuando usamos dos puntos ":" al momento de definir la posicion de una lista entonces le estaremos indicando que queremos una sublista de esa lista siendo el primer valor la posicion inicial y el segundo valor hasta que posicion tiene que llegar (menor que)
print(alumnos[1:3])
# destructuracion de una lista (extraer los elementos internos de la lista)
print(alumnos[:])
# cuando usamos posiciones negativas en una lista entonces la invierte, es decir, ahora la posicion -1 sera el ultimo elemento de la lista y asi sucesivamente
print(alumnos[-1])
print(alumnos[-2])

for alumno in alumnos:
    if alumno == 'EDUARDO':
        print('SI ESTA')
        break

# Sentido de pertenencia > podemos consultar si un valor determinado existe en la lista
print('EDUARDO' in alumnos)
print(10 in alumnos)

# listas son colecciones de datos EDITABLES 
alumnos[0] = 'MARTIN'
print(alumnos)

# append > sirve para agregar un valor a la lista al final
alumnos.append('IVANOV')
print(alumnos)

# extend > combinar las dos listas en una sola
alumnos.extend(['LUIS', 'LILY', 'JORDAN'])
print(alumnos)
# otra forma de combinar es 'concatenando' las listas
alumnos += ['YORDY', 'JAVIER', 'RUBEN']
print(alumnos)

# Eliminar un elemento de la lista
# nombre = 'eduardo'
# del nombre # elimina la variable de toda la maquina
# print(nombre)

# Primera forma eliminando por el metodo del
del alumnos[1:3]
print(alumnos)

# Segunda forma usando el metodo pop, este metodo lo que hace es elimina el contenido de esa posicion PEEERO se puede almacenar el contenido en otra variable
alumno_eliminado = alumnos.pop(2)


print(alumnos)
print(alumno_eliminado)

# Tercera forma usando el metodo clear limpiaremos toda la lista y la dejaremos en blanco
alumnos.clear()

print(alumnos)