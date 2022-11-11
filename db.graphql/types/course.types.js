

export default 
`
input CursoInput {
    title: String!
    views: Int
}
type Curso {
    id: ID
    title: String
    views: Int
}
type Mensaje {
    mensaje: String
}
type Query {
    getCursos(pagina:Int=1,porpagina:Int=3): [Curso]
    getCurso(title:String):Curso
    getAll:[Curso]
}
type Mutation {
    addCurso(input:CursoInput):Curso
    updateCurso(id:ID, input:CursoInput):Curso
    deleteCurso(id:ID):Mensaje
}
`

