# Parcial 01

En esta app tienes la capacidad de crearte una cuenta, tener un manejo de las cuentas creadas en la app, la capacidad de añadir películas, directores y lo principal, reseñas, nuestra app se ve diseñada para que el usuario sea capaz de escribir reseñas, aunque por el momento el enfoque principal es el uso de todas las funciones.

## Tabla de contenidos

- [Instalación](#Instalación)
- [Uso de la página](#uso-de-la-página)
- [Crear un usuario](#Crear-un-usuario)
- [Añadir una película](#Añadir-una-película)
- [Registar un director](#Registrar-un-director)
- [Rutas](#rutas)
- [Modelos](#modelos)
- [javascript](#javascript)


## Instalación

Las instrucciones a tomar a la hora de querer arrancar el proyecto son las siguientes

```bash
# Clonar el repositorio
git clone https://github.com/DiegoQuisbert/parcial-1.git

# Entrar al directorio del proyecto

cd parcial-1

# crear un archivo nuevo llamado .env con los siguientes datos

PORT=3000
URI_BD=mongodb://127.0.0.1:27017/app

# Instalar las dependencias

npm i

# Importar los datos de mongodb

No se como explicar, pero en la base de datos simplemente importás el json y listo

# Iniciar el proyecto

npm start

```
# Uso de la página

``` bash
# Pegamos la URL en el navegador

http://127.0.0.1:3000/

# Obtener id's de usuarios, películas y directores

Dar click a los respectivos botones para mostrar todo y ID

# Buscar película por ID

Colocar el ID de una película y presionar el botón

# Buscar Reseña por ID

Colocar el ID de un usuario y presionar el botón

# Buscar usuario por ID

Colocar el ID de un usuario y presionar el botón




``` 

# Crear un Usuario

``` bash
#     Método: POST
#     URL: http://127.0.0.1:3000/api/users
#     Body (JSON):

``` 

``` bash

# json

# {
#   "name": "Nicolas Rodriguez",
#   "email": "nicolas@example.com",
#   "password": "123456"
# }

```
# Añadir una Película

``` bash

#     Método: POST
#     URL: http://127.0.0.1:3000/api/movies
#     Body (JSON):

#  json

#     {
#       "title": "Matrix",
#       "genre": "Sci-Fi",
#       "year": 1999,
#       "director": "616e6e77eae4e232b8b758c7",
#       "reviews": ["Increíble!", "Ciencia ficción en su máxima expresión"]
#     }
```

# Registrar un Director

``` bash
#     Método: POST
#     URL: http://127.0.0.1:3000/api/directors
#     Body (JSON):

# json

#     {
#       "name": "Lana Wachowski",
#       "birthYear": 1965,
#       "nationality": "Estadounidense"
#     }

```

# Rutas
A continuación se describen las rutas disponibles en esta API:

``` bash
# Método	Endpoint	Descripción
# POST	/users	Crear un nuevo usuario
# POST	/movies	Añadir una nueva película
# POST	/directors	Registrar un nuevo director
# GET	/movies	Obtener todas las películas
# GET	/movies/{id}	Obtener película por ID
# GET	/movies?name={name}	Buscar película por nombre
# GET	/directors	Obtener todos los directores

```
# Modelos

``` bash
# User Model (models/userModel.js)
```

# javascript

``` bash
# const mongoose = require('mongoose');

# const userSchema = new mongoose.Schema({
#   name: String,
#   email: { type: String, unique: true },
#   password: String,
#   role: { type: String, default: 'user' }
# });

# module.exports = mongoose.model('User', userSchema);

# Movie Model (models/movieModel.js)

# javascript

# const mongoose = require('mongoose');

# const movieSchema = new mongoose.Schema({
#   title: String,
#   genre: String,
#   year: Number,
#   director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director' },
#   reviews: [{ type: String }]
# });

# module.exports = mongoose.model('Movie', movieSchema);

# Director Model (models/directorModel.js)

# javascript

# const mongoose = require('mongoose');

# const directorSchema = new mongoose.Schema({
#   name: String,
#   birthYear: Number,
#   nationality: String
# });

# module.exports = mongoose.model('Director', directorSchema);

# Controllers
# User Controller (controllers/userController.js)

# javascript

# const User = require('../models/userModel');

# const createUser = async (req, res) => {
#   try {
#     const newUser = new User(req.body);
#     await newUser.save();
#     res.status(201).json({ message: 'Usuario creado', user: newUser });
#   } catch (error) {
#     res.status(400).json({ error: error.message });
#   }
# };

# module.exports = { createUser };

# Movie Controller (controllers/movieController.js)

# javascript

# const Movie = require('../models/movieModel');

# const createMovie = async (req, res) => {
#   try {
#     const newMovie = new Movie(req.body);
#     await newMovie.save();
#     res.status(201).json({ message: 'Película añadida', movie: newMovie });
#   } catch (error) {
#     res.status(400).json({ error: error.message });
#   }
# };

# module.exports = { createMovie };

```