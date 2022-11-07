const express = require('express')
const mongoose = require('mongoose')
const { graphqlExpress, graphiqlExpress} = require('graphql-server-express')


mongoose.connect(process.env.urimongodb)

//Servidor HTTP
const app = express();
app.listen( process.env.puerto, ()=>{
    console.log("Servidor iniciado en puerto ", process.env.puerto)
})
