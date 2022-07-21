# Documentando nuestra aplicacion
- Url: https://github.com/axnsan12/drf-yasg/

# Desplegar nuestra aplicacion en heroku
- Configuramos los static files para que nos pueda cargar swagger
- Crear nuestro archivo Procfile
- Crear una base de datos en Heroku con JawsDB
- Crear nuestras variables de entorno en heroku con las credenciales de JawsDB
- Inicializar git en nuestro proyecto con: git init
- Hacemos una conexion remota con: heroku git:remote -a <nombre-de-la-aplicacion>
- Desplegamos el proyecto con: git add . && git commit -m "Inicializacion" && git push heroku <nombre-de-la-rama>
- Hacemos una migración de la base de datos con: heroku run python manage.py migrate

# Configuración de CORS
- Url: https://pypi.org/project/django-cors-headers/
- Configuramos nuestra aplicacion para que pueda ser consumida desde cualquier lugar
- Para eso primero instalamos el paquete cors: pip install django-cors-headers
- Añadimos el paquete a nuestra aplicacion:
```python
INSTALLED_APPS = [
    ...,
    "corsheaders",
    ...,
]
```
- Añadimos los middlewares a nuestra aplicacion:
```python
MIDDLEWARE = [
    ...,
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    ...,
]
```
- Añadimos la libreria a nuestro requirements.txt: