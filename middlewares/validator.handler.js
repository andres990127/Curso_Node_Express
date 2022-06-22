// Middleware para validar esquemas de información entrante

// Se importa el modulo boom para el manejo de errores
const boom = require('@hapi/boom');

// Función para validar esquemas, recibe el esquema que debe revisar y la propiedad donde debe buscar la información para comparar con el esquema
function validatorHandler(schema, property) {
  return (req, res, next) => {

    // Recibe la propiedad para buscar la data a comparar con el esquema
    const data = req[property];

    // Validamos si la data obtenida cumple con el esquema, se saca el error que se pueda obtener
    const { error } = schema.validate(data, { abortEarly: false });

    // Si existe un error llamamos al middleware que gestiona errores y le enviamos el error
    if (error) {
      next(boom.badRequest(error));
    }

    // Sino existe error entonces se sigue le flujo normal
    next();
  }
}

// Se exporta le validador
module.exports = validatorHandler;
