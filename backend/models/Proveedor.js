const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    contacto: { type: String, required: true },
    telefono: { type: String, required: false }
});

module.exports = mongoose.model('Proveedor', proveedorSchema);
