const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true }
});

module.exports = mongoose.model('Producto', productoSchema);
