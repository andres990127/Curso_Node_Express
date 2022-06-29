// Middleware para gestión de errores

const{ValidationError}=require('sequelize');

// Middleware para mostrar en un log el error
function logErrors (err, req, res, next) {
  console.error(err);
  next(err);
}

// Middleware para dar respuesta a errores conocidos establecidos en boom, si no es boom se llama al siguiente manejador de errores
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

// Middleware para respuesta estandar de errores si no fue un error boom
function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  }
  next(err);
}


module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler}
