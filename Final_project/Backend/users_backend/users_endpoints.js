const express = require('express')
const cors = require('cors')

const app = express();
const PORT = 3004;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public'))); // para usar public y las imagenes
app.use(cors())
app.use(express.json())

// Base de datos hardcodeada 

let users = [
    {id: 1, name: 'Dhidel Osorio', img: 'http://localhost:3004/images/person.png', plan: true, gmail: 'dhidelarevalo123@gmail.com'},
    {id: 2, name: 'Sofía Bilbao', img: 'http://localhost:3004/images/person.png', plan: true, gmail: 'sofiabilbao@gmail.com'}, //agregar correo correcto
]

let nexId = 3

//GET - TODO 
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    
    const profileData = {
        ...user,
        planName: user.plan ? 'Plan Plus' : 'Plan Básico'
    };
    res.json(profileData);
});

// POST
app.post('/users', (req, res) => {
    const {name, img, plan, gmail} = req.body;

    if(!name){
        return res.status(400).json({ error: 'Los campos "name" son requeridos'})
    }

    const newUser ={
        id: nexId++,
        name,
        img,
        gmail,
        plan, 
    };

    users.push(newUser);
    res.status(201).json(newUser);
})


// PATCH

app.patch('/users/:id',  (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex( p => p.id === id);

    if(index === -1){
        return res.status(404).json({ error: 'Usuario no encontrado'})
    }

    const {name, img, plan, gmail} = req.body

    users[index] = {
        ...users[index],
        ...(name && {name}),
        ...(plan !== undefined && {plan})
        ...(img && {img}),
        ...(gmail && {gmail})
    }

    res.json(users[index]);
});

//DELETE

app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(p => p.id === parseInt (req.params.id));
    if (index === -1){
        return res.status(404).json({ error: 'Usuario no encontrado'})
    }

    const deleted = users.splice(index, 1);
    res.json ({ message: 'Usuario eiminado', project: deleted[0]});
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})