import express from 'express'
const app = express();
import mongoose from 'mongoose'
//import { graphqlExpress, graphiqlExpress} from 'graphql-server-express'
//import  graphiqlExpress from 'apollo-server-express'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from '@apollo/server/express4';
//const { graphqlExpress, graphiqlExpress} = require('@apollo/server')
import { makeExecutableSchema } from '@graphql-tools/schema'
//import { makeExecutableSchema } from 'graphql-tools'
import bodyParser from 'body-parser'

import courseTypes from     './db.graphql/types/course.types.js'
import courseResolvers from './db.graphql/resolvers/course.resolvers.js'



//Conectar MongoDB con Mongoose
mongoose.connect(process.env.urimongodb, {useNewUrlParser:true})
.then( (mongo)=>console.log("Conexión a mongoDB OK.",mongo.models) )
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


const schema = makeExecutableSchema({
    typeDefs: [typeDefs,courseTypes], //está combinando typeDefs y courseTypes
    resolvers: [resolvers,courseResolvers] // está combinando resolvers con courseResolvers   
})

const server = new ApolloServer( {schema});


  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
  app.use('/graphql', bodyParser.json(),expressMiddleware(server))

//Servir GraphiQL en /graphiql
//app.use('/graphql',  bodyParser.json(), graphqlExpress({schema:schema}))
//app.use('/graphiql',  graphiqlExpress({ endpointURL: '/graphql'}))
//app.use('/graphiql',expresServer )

//Servidor HTTP
app.listen( process.env.puerto, ()=>{
    console.log("Servidor express iniciado en puerto ", process.env.puerto)
})
