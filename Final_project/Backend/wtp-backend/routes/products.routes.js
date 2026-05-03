const express = require('express');
const router = express.Router(); // En vez de app, usa router porque es un archivo separado
const Product = require('../models/product.model'); // Importa el modelo de producto

// GET /api/products  (devuelve TODOS los productos)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // busca todo en MongoDB
    res.json(products); // devuelve los productos en JSON
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// POST /api/products (crea un producto nuevo)
// req.body trae los datos que se mandan desde Postman
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body); // crea el producto con los datos recibidos
    await product.save(); // lo guarda en MongoDB
    res.status(201).json(product); // devuelve el producto creado
  } catch (err) {
    res.status(422).json({ error: 'Datos inválidos', details: err.message });
  }
});

// DELETE /api/products/:id (elimina un producto por su id)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id); // busca y elimina
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

// PATCH /api/products/:id (actualiza solo los campos que se mandan)
router.patch('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // solo modifica lo que llegó
      { new: true }       // devuelve el producto ya actualizado
    );
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(422).json({ error: 'Datos inválidos', details: err.message });
  }
});

module.exports = router;