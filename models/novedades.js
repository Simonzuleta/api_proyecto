//Migracion 
const {Schema, model}=require('mongoose')

const NovedadSchema= Schema({
    nombre:{
        type: String,
        required: [true,'El campo nombre novedad es requerido']

    },
    descripcion:{
        type: String,
        required:[true, 'El password es requerido']
    },

    tipoNovedad:{
        type:String,
        required:[true, 'el tipo de novedad es obligatorio']
       // enum:['Admin', 'Asesor']

    },

    autor:{
        type:String,
        required:[true, 'El autor es obligatorio'],

    }
    
    

    
})

module.exports = model('Novedad', NovedadSchema)//Exportar el modelo
