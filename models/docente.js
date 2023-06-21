const { Schema, model } = require('mongoose');

const DocenteSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El campo nombre es requerido'],
    unique: [true, 'El nombre {VALUE} ya existe'],
  },
  apellidos: {
    type: String,
    required: [true, 'El campo apellidos es requerido'],
  },
  password: {
    type: String,
    required: [true, 'El campo password es requerido'],
    minlength: [3, 'Debe tener un mínimo de 3 caracteres'],
  },
  correo: {
    type: String,
    required: [true, 'El campo correo es requerido'],
  },
  estado: {
    type: Boolean,
    required: [true, 'El campo estado es requerido'],
    default: false,
  },
});

module.exports = model('Docente', DocenteSchema);
