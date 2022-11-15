//Model en Mongoose:  Usuario   (Collection Usuarios en MongoDB)

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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

// Campo password tipo virtual, no almacenable
userSchema.virtual('password')   
// Encriptar password justo al almacenar el usuario en la bd
userSchema.pre('save', async function(){
    if (this.password===undefined) return;
    try {
        this.hassedPassword = await bcrypt.hash(this.password, 10)
        console.log("Pass:",this.password," ",this.hassedPassword)
    } catch(err) {
        console.log(error)
        throw error
    }


})

export default mongoose.model('usuarios',userSchema)
