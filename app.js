const routUsers = require('./src/routes/route_user');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/api-rest', 
{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then( () => console.log('Conectado a mongo...'))
.catch( err => console.error('Error ' + err) );

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', routUsers);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Corriendo puerto ${port}`)
})