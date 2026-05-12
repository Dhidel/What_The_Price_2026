const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: Number, unique: true }, // Lo manejaremos manualmente
  name: { type: String, required: true },
  gmail: { type: String, unique: true, required: true },
  plan: { type: String, default: 'basic' },
  password: { type: String, required: true },
  create_date: { type: Date, default: Date.now }
});

// Middleware manual de autoincremento
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isNew) {
    try {
      // Busca el usuario con el user_id más alto
      const lastUser = await mongoose.model('User').findOne().sort('-user_id');
      // Si no hay usuarios, empieza en 2000, si hay, suma 1
      user.user_id = lastUser && lastUser.user_id ? lastUser.user_id + 1 : 2000;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model('User', userSchema);