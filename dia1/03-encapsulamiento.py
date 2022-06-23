# PILARES
# 1. Abstraccion
# 2. Encapsulamiento
# 3. Herencia
# 4. Polimorfismo

class Vehiculo:
    def __init__(self, marca, modelo):
        self.marca = marca
        self.modelo = modelo
        # si queremos indicar que un atributo de la clase va a ser privado (no va a poder ser accedido desde fuera de la clase) tendremos que colorar doble guion bajo al inicio del nombre del atributo
        self.__serie = marca+modelo
        # TODO: explicar el tipo PROTECTED
        self._serie2 = marca+modelo
    
    def mostrarSerie(self):
        print(self.__serie)

auto = Vehiculo('Kia', 'Picanto')
camion = Vehiculo('Volvo', 'F30')
print(auto.marca)
print(auto._serie2)
auto.mostrarSerie()