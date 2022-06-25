from flask import Flask, request
from datetime import datetime
from flask_cors import CORS


# __name__ > variable propia de python que muestra si el archivo que estamos utilizando es el archivo principal del proyecto, si es el archivo principal su valor era '__main__' caso contrario indicara otro valor
app = Flask(__name__)

# la clase CORS si solamente le pasamos la instancia de nuestra clase Flask entonces modificara los CORS para que puedan ser accedidos por todo el mundo (cualquier origen, cualquer metodo y cualquier cabecera)
CORS(app)


productos = []

# Endpoint
# decorador es un patron de software que se utiliza para modificar el comportamiento de un metodo de una clase sin la necesita de emplear otros metodos como la herencia y ademas tampoco es necesario modificar el comportamiento del metodo de dicha clase


@app.route('/')
def rutaInicial():
    print('ingreso al endpoint inicial')
    return 'Bienvenido a tu primera API de CodiGo de Backend :D'


@app.route('/estado')
def estadoAPI():
    return {
        'hora': datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # string from time
    }


@app.route('/producto', methods=['POST'])
def gestionProductos():
    # get_json() > convierte el json que el cliente envia a un diccionario para que python lo pueda entender
    print(request.get_json())
    producto = request.get_json()
    productos.append(producto)
    return {
        'message': 'Producto creado exitosamente',
        'content': producto
    }


@app.route('/devolver-productos', methods=['GET'])
def devolverProductos():
    return {
        'message': 'Los productos son',
        'content': productos
    }


# levantamos nuestro servidor para que se quede a la espera de posibles peticiones durante un tiempo indeterminado
# debug > indicara que si estamos en un servidor de prueba entonces cada vez que hagamos algun cambio a algun archivo del proyecto automaticamente se reiniciara el servidor agregando los nuevos cambios (su valor por defecto es False)
app.run(debug=True)
