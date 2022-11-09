import express from 'express'
const app = express();
import mongoose from 'mongoose'
//import { graphqlExpress, graphiqlExpress} from 'graphql-server-express'
//import  graphiqlExpress from 'apollo-server-express'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from '@apollo/server/express4';
//const { graphqlExpress, graphiqlExpress} = require('@apollo/server')
//const { makeExecutableSchema } = require('@graphql-tools/schema')
import { makeExecutableSchema } from 'graphql-tools'
import bodyParser from 'body-parser'

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
    typeDefs: typeDefs,
    resolvers: resolvers   
})

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });


  
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
