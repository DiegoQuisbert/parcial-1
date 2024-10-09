const express = require('express');
const routerAPI = require('./routes');
const db = require('./config/dataBase.js');
require('dotenv').config();

const port = process.env.PORT;

const app = express();

app.use( express.json());

app.use(  express.static('public') );

app.use(  (req, res, next) => {
    console.log('Soy el middleware');
    next();
}) 

app.get('/', (req, res) => {
    res.status(200).send('<h1> API REST </h1>');
})

routerAPI(app);

app.listen( port, () => { 
    console.log(`Servidor en el puerto ${port}`)
});