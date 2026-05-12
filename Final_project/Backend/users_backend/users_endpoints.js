//Importando librerías
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express(); //Ponerle nombre a la constante con las especificaciones de express
const PORT = process.env.PORT || 3006; //El puerto 

mongoose.connect(process.env.MONGO_URI) //Aqui conectamos el backend con la base de datos
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error de conexión:', err));

  const User = require('./models/Users'); // Importa el modelo

app.use(cors()); //Para aceptar peticiones
app.use(express.json()); //Leer los archivos en formato json

//GET - Todo
app.get('/users', async (req, res) => { //Async es para obtener una promesa
  try{
    const allUsers = await User.find() //Busca todo en la colección, away es para detener cuando la promesa se cumpla o falle
    res.json(allUsers);
  }
  catch (error) {
    console.log("ERROR REAL:", error); // Esto te dirá en la terminal exactamente qué falló
    res.status(400).json({ error: 'Hubo un error al guardar', detalle: error.message });
}
});

//POST - Para crear un nuevo usuario
app.post('/users', async (req, res) => {
  const { name, plan, password, gmail } = req.body; // Es el esquema o body que se debe cuplir

  if (!name || !password || !gmail) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const newUser = new User({ name, plan, password, gmail }); // Te pide el esquema
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('REGISTER ERROR:', error);

    if (error.code === 11000) {
      return res.status(409).json({
        error: 'El correo ya existe',
        keyValue: error.keyValue
      });
    }

    return res.status(500).json({
      error: 'Error al registrar usuario', // Errores con más especificaciones para saber exactamente que pasó
      detalle: error.message,
      code: error.code
    });
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
        $set: {  // Operador de mongo que indica qué datos debe cambiar 
          ...(name && { name }),
          ...(plan && { plan }),
          ...(password && { password }), // Condiciones de control 
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
app.delete('/users/:id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

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