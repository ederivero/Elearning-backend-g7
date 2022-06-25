from flask import Flask

# __name__ > variable propia de python que muestra si el archivo que estamos utilizando es el archivo principal del proyecto, si es el archivo principal su valor era '__main__' caso contrario indicara otro valor
app = Flask(__name__)


# Endpoint
# decorador es un patron de software que se utiliza para modificar el comportamiento de un metodo de una clase sin la necesita de emplear otros metodos como la herencia y ademas tampoco es necesario modificar el comportamiento del metodo de dicha clase
@app.route('/')
def rutaInicial():
    print('ingreso al endpoint inicial')
    return 'Bienvenido a tu primera API de CodiGo de Backend :D'


# levantamos nuestro servidor para que se quede a la espera de posibles peticiones durante un tiempo indeterminado
# debug > indicara que si estamos en un servidor de prueba entonces cada vez que hagamos algun cambio a algun archivo del proyecto automaticamente se reiniciara el servidor agregando los nuevos cambios (su valor por defecto es False)
app.run(debug=True)
