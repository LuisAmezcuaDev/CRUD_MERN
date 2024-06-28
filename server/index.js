const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users');


const app = express()
app.use(cors())
app.use(express.json())

//es la direccion a la que se va a conectar la base de datos

mongoose.connect('mongodb://127.0.0.1:27017/topicos')


// permite traer los datos a la pantalla principal
app.get('/', (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

//permite traer la lista de los usuarios y mostrarla en la ventana principal
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

//permite actualizar los datos de los usuarios
app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id}, {
        name: req.body.name, 
        email: req.body.email, 
        nControl: req.body.nControl,
        unidad: req.body.unidad, 
        cali: req.body.cali
    })
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

//esta funcion permote la creacion de un nuevo usuario 
// desde la pantalla de add

app.post('/createUser', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

//permite eliminar a los usuarios haciendo uso de su id
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

//Definimos el puerto en el que el servidor esta funcionando
app.listen(3001, () => {
    console.log('Server is Running')
})