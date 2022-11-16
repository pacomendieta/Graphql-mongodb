//Model en Mongoose:  Usuario   (Collection Usuarios en MongoDB)

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import config from "../config/claves.js"

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

// Hook para usarse al crear usuarios en signUp
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

//Método estático para usarse al validar usuario con longIn
userSchema.statics.autenticar= async function ({email,password}) {
    //verificar que usuario existe
    const user = await this.findOne( {email} )
    if (!user) throw "Email no existe"
    // comparar password con la hassedpasswor almacenada
    const resultado = await bcrypt.compare(password,user.hassedPassword)
    if (!resultado) throw 'Email o password erróneos'
    // Generar un token JWT (JSON web token) y guardarlo en el campo token
    user.token = jwt.sign({id:user.id }, config.secretoJWT)
    console.log("generar el JWT con secreto ",config.secretoJWT)
    await user.save()
    return user
}

export default mongoose.model('usuarios',userSchema)
