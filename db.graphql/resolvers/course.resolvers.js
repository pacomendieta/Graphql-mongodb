
let bdcursos = [{ id:1, title:"uno", views:1000} ]
import Cursos from "../../models/curso.js"

const resolvers = {
    Query:{
        getCursos(rootvalue, args) {
            return bdcursos.slice(args.pagina*args.porpagina, (args.pagina+1)*args.porpagina)
        },
        async getCurso(rootvalue, {title} ) {
            let curso;
            Cursos.find(  {title:title}, function(error,docs){
                console.log("docs:", docs)
                console.log("error:", error)
                curso = docs[0]
            }  )
            let cursos =  await Cursos.find(  {title:title} ).exec()
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
        updateCurso(rootvalue, {id,input} ){
            const {title, views} = input
            const pos = bdcursos.findIndex((curso)=>curso.id==id )
            if (!pos) return null;
            const curso = {id, ...input}
            bdcursos[pos] = curso
            return curso
        },
        deleteCurso(rootvalue,{id}) {
            bdcursos = bdcursos.filter((curso)=>curso.id != id )
            return { mensaje: `El curso con id=${id} ha sido eliminado`}
        }
    } //end Mutation
}  //end resolvers

export default resolvers