# Flask - creación del proyecto

- Crear nuestro entorno virtual `python -m venv venv`
- Creamos la carpeta flask-introduction
- Activamos el entorno virtual con `source venv/Scripts/activate`
- Si aun no se ha instalado ninguna dependencia, se instala con `pip install -r requirements.txt`
- Ingresamos a la carpeta con `cd flask-introduction`
- Creamos nuestro archivo requirements.txt
- Instalar flask con `pip install flask`
- Añadimos Flask a nuestro archivo requirements.txt
- Creamos un archivo app.py
- Si mi archivo principal no se llama app.py exportar una variable de entorno con `export FLASK_APP=api.py`
- Exportar mi variable de entorno Debug con `export FLASK_DEBUG=1`
- Inicializamos el servidor con `flask run`