// Importamos express para el servidor web
const express = require('express');

// Importamos los archivos de rutas existentes
const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');

// Asignamos el archivo de ruta correspondiente según lo solicitado
function routerApi(app) {

  // Importamos router para facilitar el acceso a los archivos de rutas correspondientes
  const router = express.Router();

  // Usamos router en nuestra app y le colocamos por defecto la entrada /api/v1
  app.use('/api/v1', router);

  // Llamadas a las rutas correspondientes
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
}

// Exportamos el gestor de rutas
module.exports = routerApi;
