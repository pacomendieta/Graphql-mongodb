
let bdcursos = [{ id:1, title:"uno", views:1000} ]
import Cursos from "../../models/curso.js"
let cursos; 
let curso;
const resolvers = {
    Query:{
        async getCursos(rootvalue, args) {
            const {porpagina,pagina} = args
            //const cursos = await Cursos.find().limit(porpagina).skip( (pagina-1)*porpagina)
            cursos = Cursos.find()
            if ( pagina > 0) {
                cursos.limit(porpagina).skip( (pagina-1)*porpagina)   
            }
            cursos = await cursos
            return cursos
        },

        async getCurso(rootvalue, {title} ) {
       
            //Cursos.find(  {title:title}, function(error,docs){
            //    cursos = docs
            //}  )
            cursos =  await Cursos.find(  {title:title} ).exec()
            return cursos[0]
        },
        async getAll(rootvalue) {
           let cursos = await Cursos.find()
           return cursos;
        }
    },
    Mutation:{
        async addCurso(rootvalue, {input}) {
            const {title,views} = input
            let curso = {...input }
            curso = await Cursos.create( curso )
            await curso.save()
            return curso
        },
        async updateCurso(rootvalue, {id,input} ){
            curso = await Cursos.findByIdAndUpdate(id, input,{returnDocument:'before'}).exec()
            //.then((doc)=>{ console.log("sale por then"); curso=doc; console.log(doc) } ) 
            //.catch((err)=>console.log("sale por catch",err))
            console.log("curso:", curso)
            return curso
        },
        async deleteCurso(rootvalue,{id}) {
            await Cursos.deleteOne({_id:id}).exec()
            //.then(()=>console.log("sale por then"))
            //.catch(()=>console.log("sale por catch"))
            return { mensaje: `El curso con id=${id} ha sido eliminado`}
        }
    } //end Mutation
}  //end resolvers

export default resolvers