// models/User.js
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
  name: String,
  gmail: { type: String, unique: true },
  plan: { type: String, default: 'basic' },
  password: { type: String, required: true },
  create_date: { type: Date, default: Date.now }
});

userSchema.plugin(AutoIncrement, { inc_field: 'user_id', start_seq: 200 });

// Exportamos el modelo para que otros archivos lo usen
module.exports = mongoose.model('User', userSchema);