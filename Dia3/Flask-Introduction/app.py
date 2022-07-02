from flask import Flask, jsonify

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

@app.route('/alumno', methods=['GET'])
def alumno():
    return jsonify({
        'alumnos': 'Eduardo De Rivero'
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


if __name__ == "__main__":
    app.run(debug=True)