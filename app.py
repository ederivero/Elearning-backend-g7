from flask import Flask
from config import conexion

app = Flask(__name__)

# inicializo mi conexion de mi sqlalchemy con la base de datos PERO todavia no me he conectado
conexion.init_app(app)

# se ejecuta la conexion y se crearan las tablas PERO si no hay ningun tabla a crear entonces no lanzara error de credenciales invalidas
conexion.create_all(app=app)


if __name__ == '__main__':
    app.run(debug=True)
