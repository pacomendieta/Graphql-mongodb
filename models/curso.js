// Crea el Model "curso"

import mongoose from 'mongoose'

const cursoSchema = new mongoose.Schema({
    title: String,
    views: Number
})

export default mongoose.model('CURSOS',cursoSchema)