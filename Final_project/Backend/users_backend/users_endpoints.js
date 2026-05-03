//Importando librerías
const express = require('express');
const cors = require('cors');

const app = express(); //Ponerle nombre a la constante con las especificaciones de express
const PORT = 3004; //El puerto 

app.use(cors()); //Para aceptar peticiones
app.use(express.json()); //Leer los archivos en formato json

let users = [ //Una base de datos en memoria con los valores básicos (Para mejor funcionamiento luego se agregará Gmail y Foto)
  { id: 1, name: 'Dhidel Osorio', plan: 'plus', contrasena: '101010' },
  { id: 2, name: 'Sofía Bilbao', plan: 'basic', contrasena: '111111' },
];

let nextId = 3; //Hardcodeado para las pruebas

//GET - Todo
app.get('/users', (req, res) => {
  res.json(users);
});

//GET - Por Id
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.json({
    ...user,
    planName: user.plan === 'plus' ? 'Plan Plus' : 'Plan Básico'
  });
});

//POST - Para crear un nuevo usuario
app.post('/users', (req, res) => {
  console.log('POST /users llegó');
  console.log('Body recibido:', req.body); //Para imprimir en la consola (Para pruebas)

  const { name, plan, contrasena } = req.body;

  if (!name || !plan || !contrasena) {
    return res.status(400).json({ error: 'name, plan y contrasena son requeridos' });
  }

  const newUser = {
    id: nextId++,
    name,
    plan,
    contrasena
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

//POST - Para validar el log in
app.post('/login', (req, res) => {
  const { name, contrasena } = req.body;

  const user = users.find(
    u => u.name === name && u.contrasena === contrasena
  );

  if (!user) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  res.json({
    ...user,
    planName: user.plan === 'plus' ? 'Plan Plus' : 'Plan Básico'
  });
});

//PATCH - Para editar cosas de la base de datos (Se implementará en el futúro para editar en el profile-page)
app.patch('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const { name, plan, contrasena } = req.body;

  users[index] = {
    ...users[index],
    ...(name && { name }),
    ...(plan && { plan }),
    ...(contrasena && { contrasena })
  };

  res.json(users[index]);
});

//DELETE - Elimina un usuario (Se implementará en la hamburguer-bar para eliminar un usuario)
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const deletedUser = users.splice(index, 1)[0];
  res.json({ message: 'Usuario eliminado', user: deletedUser });
});

//Aquí se levanta el servidor con el puerto que pusimos
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});