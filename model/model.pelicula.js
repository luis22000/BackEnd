const mongoose = require('mongoose');

const Pelicula = mongoose.Schema({
    NombrePelicula: String,
    NombreDirector: String,
    Genero: String,
    Duracion: Number,
    Descripcion: String
});

module.exports = mongoose.model('PeliculaDB',Pelicula);
