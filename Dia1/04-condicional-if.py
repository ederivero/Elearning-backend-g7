edad_roberta = 20

if edad_roberta >= 18 :
    print('Si puede entrar a la discoteca')
else:
    print('No puedes entrar, anda al cine')


edad_martin = -5

if edad_martin >= 65:
    print('Esa persona esta jubilada')
elif edad_martin >= 18:
    print('Esa persona es mayor de edad')
elif edad_martin >= 0:
    print('Esa persona es menor de edad')
else:
    print('Edad imposible')

print('hola')

# la forma para ingresar valores al programa desde consola
# data = int(input("Hola, ingresa tu edad: "))
talla = input("Hola, ingresa tu talla de polo: ").lower()
print(type(talla))

# Dependiendo de la talla del polo podriamos hacer lo siguiente: si es XL entonces indicar que llegara para fines de mes, si es L o M solicitar el color del polo, si es S indicar que solamente hay en color Morado, si ingresa otra cosa, indicar que la talla es incorrecta

# Primer metodo
if talla == 'xl':
    print('El polo recien llegara a fin de mes')
elif talla == 'l' or talla == 'm':
    input('Ingresa el color del polo')
elif talla == 's':
    print('Solamente hay en color morado')
else:
    print('Talla incorrecta')


# Segundo metodo que igual funciona
if talla == 'l' or talla == 'm':
    input('Ingresa el color del polo')
elif talla == 's':
    print('Solamente hay en color morado')
elif talla == 'xl':
    print('El polo recien llegara a fin de mes')
else:
    print('Talla incorrecta')