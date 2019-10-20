const express = require('express');

const server = express();
//CRUD DE USUARIOS
const users = ['Manoel', 'Diego', 'Marcos'];

server.use(express.json());

server.use('/', (req, res, next) => {
    console.log('Nova requisição solicitada:');
    console.log(`Metodo: ${req.method}, Url: ${req.url}`);
    console.log('O tempo de processamento é:');
    console.time('Request');
    next();
    console.timeEnd('Request');
});

function checkUserExist(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ message: 'Field Name is required' });
    }

    return next();
}

function checkUserInArray(req, res, next) {
    const user = users[req.params.id];

    if (!user) {
        return res.status(400).json({ message: 'User does not exist!' });
    }

    req.user = user;

    return next();
}

server.get('/users', (req, res) => {
    return res.json(users);
});

server.get('/users/:id', checkUserInArray, (req, res) => {
    return res.json({ message: `Olá, ${req.user}` });
});

server.post('/users', checkUserExist, (req, res) => {
    const { name } = req.body;
    users.push(name);

    return res.json(users);
});

server.put('/users/:id', checkUserExist, checkUserInArray, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    users[id] = name;

    return res.json(users);
});

server.delete("/users/:id", checkUserInArray, (req, res) => {
    const { id } = req.params;
    
    users.splice(id, 1);

    return res.send();
});

server.listen(3000);