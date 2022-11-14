//Model en Mongoose:  Usuario   (Collection Usuarios en MongoDB)

import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    email:{type:String, required:true},
    hassedPassword: { type:String, required: false},
    //password: String,
    token:String,
    cursos: [ {    // Relacion 1-N usuario->Cursos 
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'cursos'
    }]

})

export default mongoose.model('usuarios',userSchema)
