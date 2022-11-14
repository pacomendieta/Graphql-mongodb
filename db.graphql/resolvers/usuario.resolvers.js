import Usuarios from "../../models/usuario.js"
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
           let usuarios = await Usuarios.find().populate('cursos')
           return usuarios;
        }
    },
    Mutation:{
        async signUp(rootvalue, {input}) {
            const {email,hassedPassword} = input
            let usuario = {email, hassedPassword }
            usuario = await Usuarios.create( usuario )
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
    } //end Mutation
}  //end resolvers

export default resolvers;