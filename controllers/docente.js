//Importar paquetes requeridos de node
const {response}= require('express')
const bcrypt = require('bcrypt') //encriptar IMPORTAR EL PAQUETE

//Importacion de los modelos 
const Docente=require('../models/docente')

//insercion, modificacion de datos

//consultar
const docenteGet = async(req, res = response)=>{
    const{nombre}= req.query // desestructuracion obtiene lo que se manda del navegador
    

    //Buscar todos los usuarios colsultar los uasuarios
    const docentes = await Docente.find()
    res.json({
        docentes
    })
}


const docentePost= async(req, res= response)=>{
    //captura atributos o parametros
    const body =req.body
    let mensaje= ''
    console.log(body)
   
   // const{nombre,password,rol,estado}=req.query
   // try si esta bien ejecuta lo de adentro el cath si esta malo muestra error
   try{
    const docente = new Docente(body) //instaciar el objeto


    //console.log(bcrypt.hashSync(body.password,10)) NPM INSTALL BCRYPT
    const salt = 10
    docente.password = (bcrypt.hashSync(body.password,salt))


    //guardar objeto
    await docente.save()
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

const docentePut= async(req, res= response)=>{
    //captura atributos o parametros
    const{nombre, apellidos, password, correo,estado}=req.body
    let mensaje=''
    //realizar la moficiacion
   // el campo 1 es con el cual se va hacer la busqueda los demas son los campos que se va a modificar ejem nombre:nombre
    
    try{
        const docente= await Docente.findOneAndUpdate({nombre:nombre}, {apellidos:apellidos,password:bcrypt.hashSync(password,10),correo:correo, estado:estado})
        mensaje='La modificacion se efectuo correctamente'

    }
    catch(error){
        mensaje='Se presentaron problemas en la modificacion'

    }

   

    res.json({
        msg: mensaje 
    })

}


const docenteDelete= async(req, res= response)=>{
    //captura atributos o parametros
    const{_id}=req.body
    let mensaje=''
    //realizar la moficiacion
   // el campo 1 es con el cual se va hacer la busqueda los demas son los campos que se va a modificar ejem nombre:nombre
    
    try{
        const docente= await Docente.deleteOne({_id : _id})
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
    docenteGet,
    docentePost,
    docentePut,
    docenteDelete
}
