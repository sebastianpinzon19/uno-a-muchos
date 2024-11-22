const productoService = require('../services/productoService');

exports.createProducto = async (req, res) => {
    try {
        const producto = await productoService.createProducto(req.body);
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getProductos = async (req, res) => {
    try {
        const productos = await productoService.getProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProducto = async (req, res) => {
    try {
        const producto = await productoService.updateProducto(req.params.id, req.body);
        res.json(producto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProducto = async (req, res) => {
    try {
        await productoService.deleteProducto(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
