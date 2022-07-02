from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

alumnos = [
    {
        'nombre': 'Eduardo',
        'apellido': 'De Rivero'
    },
    {
        'nombre': 'Jorge',
        'apellido': 'Garnica'
    },
    {
        'nombre': 'Miguel',
        'apellido': 'Rojas'
    }
]

@app.route('/')
def hola_mundo():
    return 'Bienvenido a mi aplicación con Flask 😄'

@app.route('/alumnos', methods=['GET'])
def alumno():
    return jsonify({
        'alumnos': alumnos
    })

@app.route('/nombre/<string:name>')
def nombre(name):

    usuario = 'Jose'

    if usuario == name:
        return jsonify({
            'success': True,
            'message': 'El usuario {} si existe'.format(name)
        }), 200
    return jsonify({
        'success': False,
        'message': 'El usuario {} no existe'.format(name)
    }), 400

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        return 'Este es un metodo POST del login'
    else:
        return 'Este es otro metodo del login'

@app.route('/usuarios', methods=['GET','POST'])
def usuarios():
    if request.method == 'POST':
        nuevo_usuario = request.get_json()
        usuarios = alumnos
        # Si estuviesemos trabajando con base de datos, aquí se haria el registro del nuevo usuario
        usuarios.append(nuevo_usuario)
        return jsonify({
            "usuarios": usuarios
        })
    else:
        return jsonify({
            'usuarios': alumnos
        })

@app.route('/usuarios/<string:nombre>', methods=['GET'])
def buscar_usuario(nombre):

    for alumno in alumnos:
        if alumno['nombre'] == nombre:
            return jsonify({
                'success': True,
                'message': 'El usuario {} si existe'.format(nombre),
                'content': alumno
            }), 200

    return jsonify({
        'success': False,
        'message': 'El usuario {} no existe'.format(nombre),
        'content': None
    }), 400

@app.route('/headers', methods=['GET'])
def headers():
    if request.headers['Authorization'] == 'Basic 123':
        return jsonify({
            'success': True,
            'message': 'El usuario encontrado es',
            'content': {
                'nombre': 'Eduardo',
                'apellido': 'De Rivero'
            }
        }), 200

    return jsonify({
        'success': False,
        'message': 'Unauthorized',
        'content': None
    }), 401

@app.route('/button')
def button():
    return '<button type="button">Soy un boton</button>'


@app.route('/website')
def website():
    numero = 10
    return render_template('index.html', numero=numero)