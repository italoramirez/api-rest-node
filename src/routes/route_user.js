const express = require('express');
const Users = require('../model/users');
const routes = express.Router();

routes.get('/', (req, res) => {
    let result = listUser();
    result.then(user => {
        res.json({ user });
    }).catch(err => { 
        res.status(400).json({ 
            err 
        }) 
    })
})

routes.post('/', (req, res) => {
    let body = req.body;
    let createUsers = createUser(body);
    createUsers.then( user => {
        res.json({ user });
    }).catch(err => { res.status(400).json({ err })})
})

routes.put('/:id', (req, res) => {
    let user = userUpdate(req.params.id, req.body);
    user.then(user => { 
        res.json({ 
            user 
         });
    }).catch(err => { 
        res.status(400).json({ 
            err 
        })
    }) 
})

routes.delete('/:id', (req, res) => {
    let users = deleteUser(req.params.id);
    users.then(users => { 
        res.json({ 
            users 
        });
     }).catch( err => { 
         console.log(err);
        res.status(400).json({ 
            err 
        })
    })
})


async function listUser() {
    const user = await Users.find({ "status": true });
    return user;
}

async function createUser (body) {
    const user = new Users({
        name: body.name,
        email: body.email,
        password: body.password,
    });

    return await user.save();
}

async function userUpdate (id, body) {
    let user = await Users.findByIdAndUpdate(id, {
        $set: { 
            name: body.name,
            email: body.email,
            password: body.password,
        }
    }, { new: true });
    return user;
}

async function deleteUser (id) {
    let users = await Users.findByIdAndUpdate(id, {
        $set: { 
            status: false
        }
    }, { new: true });
    return users;
}

module.exports = routes;