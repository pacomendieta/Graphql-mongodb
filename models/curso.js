// Crea el Model "curso"

const mongoose = require ('mongoose')

const cursoSchema = new mongoose.Schema({
    title: String,
    views: Number
})

module.exports = mongoose.model('Curso',cursoSchema)