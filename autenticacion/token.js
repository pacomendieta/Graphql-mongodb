// Funcion de extraccion y verificacion del Token JWT de las peticiones de cliente
// para usar en el Context global de graphql
// Retorna objeto con Token y Usuario:  { token:String, currentUser:Usuario }
// Argumentos: req es el request, pasado por Graphql al usar la funcion como "context"

import jwt from "jsonwebtoken"
import claves from "../config/claves.js"
import usuario from "../models/usuario.js"


const getUsuarioToken = async function ( { req }) {
    let token = null
    let currentUser=null
    let payload=null;
    token = req.headers["authorization"]  //token jwt en la cabecera Authorization
    if  (token)
        try {
            payload = jwt.verify(token, claves.secretoJWT)//verificar token recibido(sin Bearer) 
        } catch(error) {
            console.log ( "Error verificando Token recibido")
        }
             
    if (token && payload) {  // obtener de la bd el usuario con id del token
        currentUser= await usuario.findById(payload.id)
        if (!currentUser) throw "El usuario del token no existe"
    }
    //Retornar objeto Usuario y el token
    return { token, currentUser }
     
}

export default getUsuarioToken;