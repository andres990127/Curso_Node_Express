// Importamos express para el servidor web
const express = require('express');

// Importamos cors para permisos de dominios
const cors = require('cors');

// Importamos las rutas de nuestra aplicación
const routerApi = require('./routes');

// Importamos los manejadores de errores de nuestra aplicación
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

// Instanciamos nuestro servidor Web
const app = express();

// Declaramos variable para el puerto en el que se ejecutará nuestra aplicación
const port = process.env.PORT || 3000;

// Usamos en nuestra aplicación express.json para leer Json de los body
app.use(express.json());

// Creamos una lista de enlaces web que permito que accedan a la aplicación
const whitelist = ['http://localhost:8080', 'https://myapp.co'];

// Declaro una constante en la que se configuran los enlaces permitidos para acceder a la aplicación
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}

// Usamos cors y enviamos la configuración de enlaces permitidos
app.use(cors(options));

// Inicio por defecto en http://localhost:3000/
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

// Respuesta por defecto en http://localhost:3000/nueva-ruta
app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

// Para la capa de rutas usamos el index de ./routes
routerApi(app);

// Middlewares para manejo de errores
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Se asigna el puerto a escuchar en la aplicación
app.listen(port, () => {
  console.log('Mi port' +  port);
});
