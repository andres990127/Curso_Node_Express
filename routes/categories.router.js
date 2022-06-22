// Importamos express para el servidor web
const express = require('express');

// Importamos router
const router = express.Router();

// Función para recibir varios parámetros y retornarlos
router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
})

// Se exporta la función
module.exports = router;
