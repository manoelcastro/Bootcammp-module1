const express = require('express');

const server = express();
//CRUD DE USUARIOS
const users = ['Manoel', 'Diego', 'Marcos'];

server.use(express.json());

// function checkUserInArray(req, res, next) {
// }

server.get('/users', (req, res) => {
    return res.json(users);
});

server.get('/users/:id', (req, res) => {
    const { id } = req.params;

    return res.json({ message: `Olá, ${users[id]}` });
});

server.post('/users', (req, res) => {
    const { name } = req.body;
    users.push(name);

    return res.json(users);
});

server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    users[id] = name;

    return res.json(users);
});

server.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    
    users.splice(id, 1);

    return res.send();
});

//server.get('/teste')

server.listen('3000');