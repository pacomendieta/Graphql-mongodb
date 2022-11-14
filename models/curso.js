// Crea el Model "curso"

import mongoose from 'mongoose'

const cursoSchema = new mongoose.Schema({
    title: String,
    views: Number,
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'usuario'
    }
})

export default mongoose.model('cursos',cursoSchema)