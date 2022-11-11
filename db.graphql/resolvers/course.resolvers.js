
let bdcursos = [{ id:1, title:"uno", views:1000} ]
import Cursos from "../../models/curso.js"
let cursos;
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
            let curso = {title,views,id:String(bdcursos.length +1)}
            curso = await Cursos.create( curso )
            await curso.save()
            return curso
        },
        async updateCurso(rootvalue, {id,input} ){
            const curso = await Cursos.findByIdAndUpdate(id, input)
            .then(()=>console.log("sale por then"))
            .catch(()=>console.log("sale por catch"))
            return curso
        },
        async deleteCurso(rootvalue,{id}) {
            await Cursos.deleteOne({_id:id})
            .then(()=>console.log("sale por then"))
            .catch(()=>console.log("sale por catch"))
            return { mensaje: `El curso con id=${id} ha sido eliminado`}
        }
    } //end Mutation
}  //end resolvers

export default resolvers