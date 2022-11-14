// Crea el Model "curso"

import mongoose from 'mongoose'

const cursoSchema = new mongoose.Schema({
    title: String,
    views: Number,
    usuarios: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'usuarios'
    }
})

export default mongoose.model('cursos',cursoSchema)