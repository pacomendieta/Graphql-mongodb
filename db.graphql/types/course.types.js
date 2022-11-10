

export default 
`
input CursoInput {
    title: String!
    views: Int
}
type Curso {
    id: ID
    title: String!
    views: Int
}
type Mensaje {
    mensaje: String
}
type Query {
    getCursos(pagina:Int=0,porpagina:Int=5): [Curso]
    getCurso(id:ID):Curso
    getAll:[Curso]
}
type Mutation {
    addCurso(input:CursoInput):Curso
    updateCurso(id:ID, input:CursoInput):Curso
    deleteCurso(id:ID):Mensaje
}
`

