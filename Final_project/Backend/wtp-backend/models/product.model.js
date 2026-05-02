// Importa mongoose para poder conectarnos a MongoDB y crear modelos
const mongoose = require('mongoose');

// Schema es la plantilla que define cómo se ve cada producto en la base de datos
const productSchema = new mongoose.Schema({

  // name: el nombre del producto (ej: "Arroz Diana 1lb")
  // required: true (no se puede guardar sin esto)
  name: { type: String, required: true },

  // category: la categoría del producto (ej: "Granos", "Lácteos")

  category: { type: String, required: true },

  // imageUrl: link a la imagen del producto
  // no tiene required, o sea es opcional
  imageUrl: { type: String },

  // prices: es un array de precios, porque el mismo producto puede tener distintos precios en distintas tiendas
  prices: [
    {
      // store: nombre de la tienda (ej: "Walmart", "La Torre")
      store: { type: String, required: true },

      // price: el precio en esa tienda (ej: 12.50)
      price: { type: Number, required: true },

      // url: link directo al producto en esa tienda (opcional)
    
      url: { type: String }
    }
  ]

// timestamps: true = MongoDB agrega automáticamente
// createdAt (cuándo se creó) y updatedAt (cuándo se editó)
}, { timestamps: true });

// Aquí convierte el schema en un Modelo llamado 'Product'  y lo exporta para usarlo en las rutas
module.exports = mongoose.model('Product', productSchema);