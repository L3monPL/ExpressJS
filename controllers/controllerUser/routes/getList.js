const express = require('express');
const route = express.Router();

route.get(''), (req, res) => {
        const users = [
            { name: 'John Doe', email: 'johndoe@gmail.com' },
            { name: 'Jane Doe', email: 'janedoe@gmail.com' },
            { name: 'Bob Smith', email: 'bobsmith@gmail.com' }
            ];
        res.json(users);
    }

module.exports = route;