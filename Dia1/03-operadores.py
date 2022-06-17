# Operadores Aritmeticos

edad_juan = 40
edad_maria = 34

# SUMA
print(edad_juan + edad_maria)

# RESTA
print(edad_juan - edad_maria)

# MULTIPLICACION
print(edad_juan * edad_maria)

# DIVISION
print(edad_juan / edad_maria)

# MODULO
print(edad_juan % edad_maria)

# COCIENTE
print(edad_juan // edad_maria)

# POTENCIA
print(edad_juan ** 1)

# print("{} - {}".format(20,19))
# En el caso de los caracteres Strings
# cuando hacemos una sumatoria en los String se hara una concatenacion
mes = 'Junio'
temporada = 'invierno'
print(mes + temporada)
# y si hacemos uso de la multiplicacion hara que se repita N cantidad de veces
print(mes * 5)


# -------------------------------------------

# Operadores Comparacion

edad_luis = 15
edad_martha = 30

# >  Mayor que 
print(edad_luis > edad_martha)

# < Menor que
print(edad_luis < edad_martha)

# == Igual que
print(edad_luis == edad_martha)

# != Diferente que
print(edad_luis != edad_martha)

# >= Mayor o igual que
print(edad_luis >= edad_martha)

# <= Menor o igual que
print(edad_luis <= edad_martha)


# Operadores Logicos

edad_marco = 25
edad_martha = 30

# and Y > basta con que una de las dos condiciones sea F para que todo sea F
print(edad_marco > 18 and edad_marco > edad_martha)
# or O > basta con que una sea V para que todo sea V
print(edad_marco > 18 or edad_marco > edad_martha)
# not NO > invierte el resultado
print(not edad_marco > 50)


# Ejercicios
edad_eduardo= 18
edad_renato = 26
edad_laura = 35


# Como saber si eduardo es mayor de edad
print(edad_eduardo >= 18)

# Como saber si eduardo es mayor que laura
print(edad_eduardo > edad_laura)

# Como saber si renato es menor que laura pero mayor que eduardo
print(edad_renato < edad_laura and edad_renato > edad_eduardo)

# como saber si laura puede ser mayor que renato o menor que eduardo
print(edad_laura > edad_renato or edad_laura < edad_eduardo)


# Operadores de Asignacion
# = Asignacion
edad = 50

# += Incremento
edad += 1 # edad++

# -= Decremento
edad -= 1 # edad--

# *= Multiplicador
edad *= 1

# /= Division
edad /= 2