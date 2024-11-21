const Producto = require('../models/Producto');

exports.createProducto = async (req, res) => {
    try {
        const producto = new Producto(req.body);
        await producto.save();
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getProductos = async (req, res) => {
    try {
        const productos = await Producto.find().populate('proveedor');
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
