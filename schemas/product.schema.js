// Se importa modulo para gestión de esquemas de datos
const Joi = require('joi');

// Se crean los "Campos" de datos con sus tipos
const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

// Se crea el esquema a recibir para poder crear un nuevo producto
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});

// Se crea el esquema a recibir para poder actualizar un producto
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

// Se crea el esquema a recibir para poder obtener un producto
const getProductSchema = Joi.object({
  id: id.required(),
});

// Se exportan los esquemas
module.exports = { createProductSchema, updateProductSchema, getProductSchema }
