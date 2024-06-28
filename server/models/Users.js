// en este archivo creamos el esquema que debe de seguir la base de datos
const mongoose = require('mongoose');
const UseSchema = new mongoose.Schema({
    name: String,
    email: String,
    nControl: Number,
    unidad: Number,
    cali: Number,
})

// ponemos el modelo en el que los datos se guardaran
// en este caso, el modelo es de alumnos y utilizara el modelo que se
// definió anteriormente
const UserModel = mongoose.model('alumnos', UseSchema)
module.exports = UserModel