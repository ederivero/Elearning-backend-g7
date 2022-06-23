# una funcion es un bloque de codigo que no se ejecutara automaticamente hasta que sea llamado

def saludar():
    print('Buenas tardes!')

saludar()

def saludarConNombre(nombre):
    print("Holas {}, como te va?".format(nombre))

def saludoCordial(nombre):
    '''Funcion que recibe un nombre y te saluda cordialmente preguntandote como te va'''
    print("Holas {}, como te va?".format(nombre))

saludarConNombre('Eduardo')


saludoCordial('Eduardo')

# funcion puede devolver un valor (esto se debera al resultado de cierta logica)

def calcularIGV(valor):
    """Funcion que recibe el valor y te devuelve el valor incluido su IGV"""
    valorIncluidoIGV = valor * 1.18
    return valorIncluidoIGV



precio = 100
precioConIGV = calcularIGV(precio)
print(precioConIGV)

precio = 110
precioConIGV = calcularIGV(precio)
print(precioConIGV)

precio = 150
precioConIGV = calcularIGV(precio)
print(precioConIGV)

precio = 800
precioConIGV = calcularIGV(precio)
print(precioConIGV)

precio = 600
precioConIGV = calcularIGV(precio)
print(precioConIGV)


def calcularSalarioMinimo(profesion, experiencia):
    salarioMinimo = 1050
    if profesion == 'Desarrollador':
        if experiencia == 'Basica':
            salarioMinimo = 3000

        elif experiencia == 'Media':
            salarioMinimo = 4000

        elif experiencia == 'Avanzada':
            salarioMinimo = 7000

    elif profesion == 'Marketing':
        if experiencia == 'Basica':
            salarioMinimo = 2500

        elif experiencia == 'Media':
            salarioMinimo = 4150

        elif experiencia == 'Avanzada':
            salarioMinimo = 6820
    
    return salarioMinimo


profesion, experiencia = 'Desarrollador', 'Media'
salario = calcularSalarioMinimo(profesion, experiencia)
print(salario)

profesion, experiencia = 'Desarrollador', 'Basica'
salario = calcularSalarioMinimo(profesion, experiencia)
print(salario)

profesion, experiencia = 'Marketing', 'Media'
salario = calcularSalarioMinimo(profesion, experiencia)
print(salario)

profesion, experiencia = 'Astronauta', 'Media'
salario = calcularSalarioMinimo(profesion, experiencia)
print(salario)

# De esta manera se puede indicar a que parametro va a ir determinado valor si no queremos respetar el orden de los parametros al momento de definir la funcion
salario = calcularSalarioMinimo(experiencia='Basica', profesion='Marketing')
print(salario)


eletrodomesticos = []

def registrarEletrodomesticos(nombre, precio, almacen='Las Malvinas'):
    eletrodomesticos.append({'nombre': nombre, 'precio': precio, 'almacen': almacen})
    return True

registrarEletrodomesticos('Licuadora 12v', 115.00)
registrarEletrodomesticos('Freidora de aire', 100, 'Cercado')
registrarEletrodomesticos('Secador de cabello', 140)
registrarEletrodomesticos('Vaso de vidrio', 9.90, 'Panamericana Norte')

print(eletrodomesticos)

def contarElectrodomesticosPorAlmacen():
    """Cuenta cuantos electrodomesticos hay en cada almacen"""
    # usar un for para iterar los electrodomesticos
    malvinas = 0
    cercado = 0
    otro = 0
    for electrodomestico in eletrodomesticos:
        if electrodomestico['almacen'] == 'Las Malvinas':
            malvinas += 1
        elif electrodomestico['almacen'] == 'Cercado':
            cercado += 1
        else:
            otro += 1
    # luego de iterar los electrodomesticos indicar 
    # en las malvinas hay 2 electrodomesticos y en el cercado hay 1 electrodomestico
    return [malvinas, cercado, otro]

resultado = contarElectrodomesticosPorAlmacen()
print('En Las Malvinas hay {}, en Cercado hay {} y en Otros hay {} electrodomesticos'.format(resultado[0], resultado[1], resultado[2]))


# si en una funcion queremos recibir un numero indeterminado de valores
# args > arguments 
def recibirAlumnos(clase, *alumnos):
    # cuando un parametro tiene el * al comienzo significa que ese parametro recibira n valores y lo convertira a una tupla
    # alumnos[0]= 'Juan'
    print(type(alumnos)) # mostrar el tipo de dato que contiene esta variable, typeof en Javascript 
    print(alumnos)
    alumnos_lista = list(alumnos) # se convierte de un tipo de dato a otro SIEMPRE Y CUANDO SEAN COMPATIBLES
    # alumnos_numero = int(alumnos) # esto al no ser compatible emitira un error y matara el programa
    print(type(alumnos_lista))
    alumnos_lista[0] = 'Rigoberto'
    print(clase)


recibirAlumnos('Eduardo', 'Juan Carlos', 'Jenny', 'Lily', 'Manuel', 'Cristian', 'Wilson', 'Alejandro')
recibirAlumnos('Eduardo', 'Juan Carlos', 'Lily', 'Manuel', 'Wilson', 'Alejandro')

# en la forma tradicional seria de la siguiente manera
def sumatoria(numero1, numero2): return numero1 + numero2
respuesta = sumatoria(10,5)
print(respuesta)

# x = (param1, param2) => {...}
# Funcion anonima (lambda function) en python
sumatoria = lambda numero1, numero2: numero1 + numero2
respuesta = sumatoria(10,5)
print(respuesta)

def sumatoriaNumeros(numero1, *numeros):
    respuesta = 0
    for numero in numeros:
        respuesta += numero
    respuesta += numero1
    return respuesta
# sumatoria = lambda numero1, *numero: numero1 + for valor in numero: 
respuesta = sumatoriaNumeros(10,5,6,7)
print(respuesta)

calcularIGVLambda = lambda valor : valor * 1.18