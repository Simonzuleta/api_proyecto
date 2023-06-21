//Importar paquetes requeridos de node
const {response}= require('express')
//const bcrypt = require('bcrypt') //encriptar IMPORTAR EL PAQUETE

//Importacion de los modelos 
const Novedad=require('../models/novedades')

//insercion, modificacion de datos

//consultar
const novedadGet = async(req, res = response)=>{
    const{nombre}= req.query // desestructuracion obtiene lo que se manda del navegador
    

    //Buscar todos los usuarios colsultar los uasuarios
    const novedades = await Novedad.find()
    res.json({
        novedades
    })
}


const novedadPost= async(req, res= response)=>{
    //captura atributos o parametros
    const body=req.body
    let mensaje=''
    console.log(body)
   
   // const{nombre,password,rol,estado}=req.query
   // try si esta bien ejecuta lo de adentro el cath si esta malo muestra error
   try{
    const novedad= new Novedad(body) //instaciar el objeto


    //console.log(bcrypt.hashSync(body.password,10)) NPM INSTALL BCRYPT
    //const salt = 10
    //usuario.password = (bcrypt.hashSync(body.password,salt))


    //guardar objeto
    await novedad.save()
    mensaje='La insercion se realizo exitosamente'

   } catch(error){
    if (error) {
        if (error.name === 'ValidationError') {
            console.error(Object.values(error.errors).map(val => val.message))
            mensaje = Object.values(error.errors).map(val => val.message)
        }
    }
    console.log(mensaje)
    
       
    }


    res.json({
        msg: mensaje
    })

    
}

const novedadPut= async(req, res= response)=>{
    //captura atributos o parametros
    const{nombre, descripcion, tipoNovedad, autor}=req.body
    let mensaje=''
    //realizar la moficiacion
   // el campo 1 es con el cual se va hacer la busqueda los demas son los campos que se va a modificar ejem nombre:nombre
    
    try{
        const novedad= await Novedad.findOneAndUpdate({nombre:nombre}, {descripcion:descripcion,tipoNovedad:tipoNovedad, autor:autor})
        mensaje='La modificacion se efectuo correctamente'

    }
    catch(error){
        mensaje='Se presentaron problemas en la modificacion'

    }

   

    res.json({
        msg: mensaje 
    })

}


const novedadDelete= async(req, res= response)=>{
    //captura atributos o parametros
    const{_id}=req.body
    let mensaje=''
    //realizar la moficiacion
   // el campo 1 es con el cual se va hacer la busqueda los demas son los campos que se va a modificar ejem nombre:nombre
    
    try{
        const novedad = await Novedad.deleteOne({_id : _id})
        mensaje='La eliminacion se efectuo correctamente.'

    }
    catch(error){
        mensaje='Se presentaron problemas en  la eliminacion.'

    }

   

    res.json({
        msg: mensaje 
    })

}


module.exports={
    novedadGet,
    novedadPost,
    novedadPut,
    novedadDelete
}
