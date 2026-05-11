//Importando librerías
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
const AutoIncrement = require('mongoose-sequence')(mongoose);

const app = express(); //Ponerle nombre a la constante con las especificaciones de express
const PORT = process.env.PORT || 3006; //El puerto 

app.use(cors()); //Para aceptar peticiones
app.use(express.json()); //Leer los archivos en formato json

//Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas (Proyecto WTP)')) //Se ejecuta si se cumple
  .catch(err => console.error('Error de conexión:', err)); //Se ejecuta si no se cumple

//Definición del esquema, sobre cómo se ve un usuario
const userSchema = new mongoose.Schema({
  name: String,
  gmail: { type: String, unique: true },
  plan: { type: String, default: 'basic' },
  password: { type: String, required: true },
  create_date: { type: Date, default: Date.now }
});

userSchema.plugin(AutoIncrement, { inc_field: 'user_id', start_seq: 1002 });
const User = mongoose.model('User', userSchema); //La conexión entre los endpoints y la base de datos

//GET - Todo
app.get('/users', async (req, res) => {
  try{
    const allUsers = await User.find() //Busca todo en la colección
    res.json(allUsers);
  }
  catch (error) {
    console.log("ERROR REAL:", error); // Esto te dirá en la terminal exactamente qué falló
    res.status(400).json({ error: 'Hubo un error al guardar', detalle: error.message });
}
});

//POST - Para crear un nuevo usuario
app.post('/users', async (req, res) => {
  const { name, plan, password, gmail } = req.body;

  if (!name || !password || !gmail) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const newUser = new User({ name, plan, password, gmail });
    await newUser.save(); // Guarda en Atlas
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'El ID o el correo ya existen' });
  }
});

//POST - Para validar el log in
app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    // Busca un usuario que coincida con nombre Y contraseña
    const user = await User.findOne({ name: name, password: password });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    res.json({
      ...user._doc,
      planName: user.plan === 'plus' ? 'Plan Plus' : 'Plan Básico'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

//PATCH - Para editar cosas de la base de datos (Se implementará en el futúro para editar en el profile-page)
app.patch('/users/:user_id', async (req, res) => {
  const { user_id } = req.params; // Captura el ID de la URL
  const { name, plan, password, gmail } = req.body; // Datos nuevos desde el body

  try {
    // findOneAndUpdate busca por el campo user_id y aplica los cambios del body
    const updatedUser = await User.findOneAndUpdate(
      { user_id: parseInt(user_id) }, 
      { 
        $set: { 
          ...(name && { name }),
          ...(plan && { plan }),
          ...(password && { password }),
          ...(gmail && { gmail })
        } 
      },
      { new: true } // Esta opción hace que la función devuelva el usuario YA editado
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Perfil actualizado con éxito', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});

//DELETE - Elimina un usuario (Se implementará en la hamburguer-bar para eliminar un usuario)
app.delete('/users/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ user_id: parseInt(user_id) });

    if (!deletedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ 
      message: 'Cuenta eliminada correctamente', 
      userDeleted: deletedUser.name 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al intentar eliminar la cuenta' });
  }
});

//Aquí se levanta el servidor con el puerto que pusimos
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});