// models/User.js
const mongoose = require('mongoose'); // Llamamos a mongoose para utilizar sus funciones

const userSchema = new mongoose.Schema({
  name: String,
  gmail: { type: String, unique: true },
  plan: { type: String, default: 'basic' },
  password: { type: String, required: true },
  create_date: { type: Date, default: Date.now } //Aquí se define la fecha y hora en la que el usuario se registra
}); //Definimos el esquema de el usuario (Se quitó el id porque tenía complicaciones e igualmente mongodb da un _id)


// Exportamos el modelo para que otros archivos lo usen
module.exports = mongoose.model('User', userSchema);