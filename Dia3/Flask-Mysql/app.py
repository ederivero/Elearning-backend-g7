from flask import Flask, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'flask_mysql'

mysql = MySQL(app)

@app.route('/')
def index():
    return 'El servidor esta funcionando 😃'

@app.route('/probar-conexion')
def conexion():
    cur = mysql.connection.cursor()
    print(cur)
    cur.close()
    return "Probando conexion a la base de datos 🤩"

@app.route('/usuarios')
def usuarios():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM usuarios')
    usuarios = cur.fetchall()

    usuarios_serializados = []

    for usuario in usuarios:
        usuarios_serializados.append({
            'id': usuario[0],
            'nombre': usuario[1],
            'email': usuario[2],
        })

    cur.close()
    
    return jsonify({
        'success': True,
        'message': 'Usuarios obtenidos correctamente',
        'content': usuarios_serializados
    })