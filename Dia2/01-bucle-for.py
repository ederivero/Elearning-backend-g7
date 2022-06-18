numeros = [10, 20, 30, 40, 50, 60]

for numero in numeros:
    print(numero)

frase_motivadora= 'Al que madruga, encuentra todo cerrado'

# contador o flag (bandera)
contador = 0

for caracter in frase_motivadora:
    # print(caracter)
    # Cuentame cuantas letras n hay en esa frase > 2
    if caracter == 'n':
        # contador = contador + 1
        contador += 1

print("hay {} veces repetida la letra n".format(contador))

for valor in range(10):
    # empezar desde el numero 0 hasta < 10 e incrementara de 1 en 1
    print(valor)

for valor in range(3, 7):
    # el primer parametro sera el numero en el cual va a empezar y el segundo hasta que numero debe llegar incrementandose de 1 en 1
    print(valor)

for valor in range(4, 7, 2):
    # el primer parametro sera el numero en el cual va a empezar y el segundo hasta que numero debe llegar y el tercer parametro sera de cuanto en cuanto debe alterar el contador
    print(valor)


numeros=[10, 30, 12, 17, 24, 67]

# cuantos de esos digitos son numeros pares y cuantos son multipos de 3
# Hay __ numeros pares y hay __ multiplos de tres
# HINT: usar un for con condicionales 
contador_numeros_pares = 0
contador_multiplos_tres = 0

for numero in numeros:
    # % MUESTRA EL RESULTADO (O RESIDUO) DE LA DIVISION
    # / MUESTRA EL COCIENTE DE LA DIVISION
    if numero % 2 == 0:
        contador_numeros_pares += 1
    
    if numero % 3 == 0:
        contador_multiplos_tres += 1

print("Hay {} numeros pares y hay {} multiplos de tres".format(contador_numeros_pares, contador_multiplos_tres))

# supongamos que los 10000 son los usuarios en un sistema y queremos encontrar al usuario con un determinado nombre (y ese usuario es el numero 600)
for valor in range(0,10000):
    print(valor)
    if(valor == 600):
        print('el usuario fue encontrado')
        # break > sirve para finalizar de manera prematura un bucle (for, while)
        break

for valor in range(0,20):
    if(valor == 5):
        print('el usuario fue encontrado')
        # continue > sirve para que el codigo que viene a continuacion no se ejecute
        continue
    print(valor)

for valor in range(0,20):
    # TODO: implementar la logica
    # pass > no hara nada pero evitara que nos lance error python
    pass


alumnos = ['EDUARDO', 'LILY', 'JOSE', 'RAFAEL']

for alumno in alumnos:
    if alumno == 'LUIS':
        print('Bienvenido LUIS')
        break
else:
    # ingresara una vez que haya terminado de iterar el for a no ser que forcemos la finalizacion de la iteracion con un BREAK
    print('No se encontro el alumno a buscar')



alumnos = ['EDUARDO', 'LILY', 'JOSE', 'RAFAEL']

for alumno in alumnos:
    if alumno == 'EDUARDO':
        pass
else:
    # ingresara una vez que haya terminado de iterar el for a no ser que forcemos la finalizacion de la iteracion con un BREAK
    print('No se encontro el alumno a buscar')