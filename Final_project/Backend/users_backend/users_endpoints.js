const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3004;

app.use(cors());
app.use(express.json());

let users = [
  { id: 1, name: 'Dhidel Osorio', plan: 'plus', contrasena: '101010' },
  { id: 2, name: 'Sofía Bilbao', plan: 'basic', contrasena: '111111' },
];

let nextId = 3;

app.get('/users', (req, res) => {
  res.json(users);
});

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

app.post('/users', (req, res) => {
  console.log('POST /users llegó');
  console.log('Body recibido:', req.body);

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

app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const deletedUser = users.splice(index, 1)[0];
  res.json({ message: 'Usuario eliminado', user: deletedUser });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});