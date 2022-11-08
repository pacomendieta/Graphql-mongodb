const express = require('express')
const app = express();
const mongoose = require('mongoose')
const { graphqlExpress, graphiqlExpress} = require('graphql-server-express')
//const { makeExecutableSchema } = require('@graphql-tools/schema')
const { makeExecutableSchema } = require('graphql-tools')
const bodyParser=require('body-parser')

//Conectar MongoDB con Mongoose
mongoose.connect(process.env.urimongodb)
.then( (mongo)=>console.log("Conexión a mongoDB OK.") )
.catch( (error)=>console.log("Error en conexión a mongoDB") )

//Definicion del Schema en GraphQL
const typeDefs = `
type Alert {
    mensaje: String
}
type Query {
  _:Boolean
}
type Mutation {
  _:Boolean
}
`

const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: {}
})


//Servir GraphiQL en /graphiql
app.use('/graphql',  bodyParser.json(), graphqlExpress({schema:schema}))
app.use('/graphiql',  graphiqlExpress({ endpointURL: '/graphql'}))

//Servidor HTTP
app.listen( process.env.puerto, ()=>{
    console.log("Servidor iniciado en puerto ", process.env.puerto)
})
