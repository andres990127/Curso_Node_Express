// Importamos faker para crear data falsa
const faker = require('faker');

// Importamos boom para el manejo de errores
const boom = require('@hapi/boom');

// Se crea una clase para producto la cual genera 100 al ser instanciada
class ProductsService {

  // Constructor que se ejecuta al instanciar esta clase, genera un array de productos y lo llena con la funcion generate()
  constructor(){
    this.products = [];
    this.generate();
  }

  // Función para generar un Json con el modulo faker simulando un producto 100 veces
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  // Función para crear un nuevo producto
  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  // Función para encontrar un producto en el array creado anteriormente, tiene 3 segundos de delay
  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    })
  }

  // Función para buscar un producto por su ID
  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  // Función para actualizar un producto
  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  // Función para eliminar un producto
  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

// Se exporta la clase ProductService que tiene las funciones para la gestión de los productos
module.exports = ProductsService;
