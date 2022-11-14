//Graph Definition Types para el modelo USUARIO
export default 
`
type Usuario {
    id: ID!
    email: String
    hassedPassword: String
    token: String
}
input UsuarioInput {
    email: String!
    password: String
}
type Query {
    getUsuarios(pagina:Int=1,porpagina:Int=3): [Usuario]
    getUsuario(title:String):Usuario
    getAllUsuarios:[Usuario]
}
type Mutation {
    signUp(input: UsuarioInput):Usuario
    logIn(input: UsuarioInput): Usuario
    signOut: Mensaje
    updateUsuario(id:ID, input: UsuarioInput):Usuario
    deleteUsuario(id:ID): Mensaje
}
`

