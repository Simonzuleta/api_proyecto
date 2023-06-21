
const {Router} = require('express')

const route = Router()
//se define despues de crear el controllador
//importar metodos del controlador
const{novedadGet, novedadPost, novedadPut, novedadDelete}=require('../controllers/novedades')
route.get('/', novedadGet)
route.post('/',novedadPost )
route.put('/',novedadPut )
route.delete('/',novedadDelete )



module.exports = route
