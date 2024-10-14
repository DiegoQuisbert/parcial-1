const express = require('express');
const routerAPI = require('./routes');
const db = require('./config/dataBase.js'); 
require('dotenv').config();

const port = process.env.PORT; 
const app = express();


app.use(express.json());
app.use(express.static('public')); 


app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.status(200).send(`
      <html>
        <head><title>API REST</title></head>
        <body style="font-family: Arial, sans-serif; text-align: center;">
          <h1>Bienvenido a la API REST</h1>
          <p>Consulta la documentación en los siguientes endpoints:</p>
          <ul>
            <li><a href="/movies">Ver todas las películas</a></li>
            <li><a href="/directors">Ver todos los directores</a></li>
            <li><a href="/movies?name=nombre_pelicula">Buscar película por nombre</a></li>
          </ul>
        </body>
      </html>
    `);
});


routerAPI(app);

app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});


app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
});


app.listen(port, () => { 
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});