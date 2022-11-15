import { isObjectIdOrHexString } from "mongoose";
import Usuarios from "../../models/usuario.js"
import Cursos   from "../../models/curso.js"
let usuarios; 
let usuario;
const resolvers = {
    Query:{
        async getUsuarios(rootvalue, args) {
            const {porpagina,pagina} = args
            //const Usuarios = await Usuarios.find().limit(porpagina).skip( (pagina-1)*porpagina)
            usuarios = Usuarios.find()
            if ( pagina > 0) {
                Usuarios.limit(porpagina).skip( (pagina-1)*porpagina)   
            }
            usuarios = await Usuarios
            return Usuarios
        },

        async getUsuario(rootvalue, {title} ) {
       
            //Usuarios.find(  {title:title}, function(error,docs){
            //    Usuarios = docs
            //}  )
            usuarios =  await Usuarios.find(  {email} ).exec()
            return usuarios[0]
        },
        async getAllUsuarios(rootvalue) {
           let usuarios = await Usuarios.find().exec()
           return usuarios;
        }
    },
    Mutation:{
        async signUp(rootvalue, {input}) {
            let usuario = new Usuarios ( input )
            console.log('en signUp al salvar, password:', usuario.password)
            await usuario.save()
            return usuario
        },
        async updateUsuario(rootvalue, {id,input} ){
            usuario = await Usuarios.findByIdAndUpdate(id, input,{returnDocument:'before'}).exec()
            //.then((doc)=>{ console.log("sale por then"); Usuario=doc; console.log(doc) } ) 
            //.catch((err)=>console.log("sale por catch",err))
            console.log("Usuario:", usuario)
            return usuario
        },
        async deleteUsuario(rootvalue,{id}) {
            await Usuarios.deleteOne({_id:id}).exec()
            //.then(()=>console.log("sale por then"))
            //.catch(()=>console.log("sale por catch"))
            return { mensaje: `El Usuario con id=${id} ha sido eliminado`}
        }
    }, //end Mutation
    // Rellenar el campo "cursos" desde Cursos (en lugar de usar populate() )
    Usuario: {
        async cursos( padre ){ //Obtiene de Cursos los cursos del usuario
            if ( padre.cursos ) {
                let c = await Cursos.find({usuarios: padre.id })
                return c
            }
        }
    }
}  //end resolvers

export default resolvers;