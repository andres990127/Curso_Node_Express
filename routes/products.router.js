// Importamos express para el servidor web
const express = require('express');

// Importamos los servicios para los productos
const ProductsService = require('./../services/product.service');

// Importamos el middleware validador
const validatorHandler = require('./../middlewares/validator.handler');

// Importamos los esuqemas del producto
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

// Importamos router
const router = express.Router();

// Llamamos a la clase servicio y creamos un nuevo servicio [Al crear un nuevo servicio se crean 100 datos fake]
const service = new ProductsService();

// Función para obtener todos los productos
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

// Función para responder a la petición en un /filter
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

// Función para obtener un producto
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

// Función para crear un producto
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

// Función para actualizar un producto
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

// Función para eliminar un producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
