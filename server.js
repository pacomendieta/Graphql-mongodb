import express from 'express'
const app = express();
import mongoose from 'mongoose'


//import { graphqlExpress, graphiqlExpress} from 'graphql-server-express'
//import  graphiqlExpress from 'apollo-server-express'
import { ApolloServer } from '@apollo/server';
//import { ApolloServer } from 'apollo-server-express';
import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from '@apollo/server/express4';
//const { graphqlExpress, graphiqlExpress} = require('@apollo/server')
//import { makeExecutableSchema } from '@graphql-tools/schema'
//import { makeExecutableSchema } from 'graphql-tools'
import bodyParser from 'body-parser'

import courseTypes from     './db.graphql/types/course.types.js'
import courseResolvers from './db.graphql/resolvers/course.resolvers.js'
import usuarioTypes from     './db.graphql/types/usuario.types.js'
import usuarioResolvers from './db.graphql/resolvers/usuario.resolvers.js'
import getUsuarioToken from './autenticacion/token.js';



//Conectar MongoDB con Mongoose
mongoose.connect(process.env.urimongodb, {useNewUrlParser:true})
.then( (mongo)=>console.log("Conexión a mongoDB OK. URI=",process.env.urimongodb) )
.catch( (error)=>console.log("Error en conexión a mongoDB") )

//Definicion del Schema en GraphQL
const typeDefs = `
type Alert {
    mensaje: String
}
type Query {
  tipo:Boolean
}
type Mutation {
  fake:Boolean
}
`

//resolvers de prueba. Abajo se añaden mas resolvers importados: courseResolvers, usuarioResolvers...
const resolvers = {
    Query:{
        tipo(rootvalue) {
            return true
        },
      },
      Mutation: {
        fake(rootvalue) {
          return true
        }
      }
}
//const fcontext = async({req,res})=>({token:'gfgfg'});
const fcontext = getUsuarioToken

const server = new ApolloServer( {   
  typeDefs: [typeDefs,courseTypes,usuarioTypes], //está combinando typeDefs y courseTypes
  resolvers: [resolvers,courseResolvers, usuarioResolvers] // todos los resolvers  
} )


  //HTML Tool GraphQL en stqandalone, fuera de la express app
  const {url} =await startStandaloneServer(server, {listen: { port: 4000 }, context:fcontext });
  console.log(`🚀  Server (HTML Tool) ready at: ${url}`);

  //HTML Tool GraphQL como middleware de la express app 
  app.use('/graphql', bodyParser.json(),expressMiddleware(server,{context:fcontext}))

//Servir GraphiQL en /graphiql
//app.use('/graphql',  bodyParser.json(), graphqlExpress({schema:schema}))
//app.use('/graphiql',  graphiqlExpress({ endpointURL: '/graphql'}))
//app.use('/graphiql',expresServer )

//Servidor HTTP
app.listen( process.env.puerto, ()=>{
    console.log("Servidor express iniciado en puerto ", process.env.puerto)
})
