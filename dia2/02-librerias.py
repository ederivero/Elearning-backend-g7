from camelcase import CamelCase

camelcase = CamelCase()

parrafo = 'hola amigos veamos si esta libreria funciona'

resultado = camelcase.hump(parrafo)
print(resultado)

# Patron de Diseño Singleton
# TODO: Replicar el funcionamiento de la libreria 