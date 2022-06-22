// Importamos express para el servidor web
const express = require('express');

// Importamos router
const router = express.Router();

// Función para recibir en el query un limit y un offset e imprimirlos
router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No hay parametros');
  }
});

// Se exporta la función
module.exports = router;
