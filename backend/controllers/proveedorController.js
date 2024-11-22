const proveedorService = require('../services/proveedorService');

// Crear un nuevo proveedor
exports.createProveedor = async (req, res) => {
    try {
        const proveedor = await proveedorService.createProveedor(req.body);
        res.status(201).json(proveedor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los proveedores
exports.getProveedores = async (req, res) => {
    try {
        const proveedores = await proveedorService.getProveedores();
        res.json(proveedores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un proveedor existente
exports.updateProveedor = async (req, res) => {
    try {
        const proveedor = await proveedorService.updateProveedor(req.params.id, req.body);
        res.json(proveedor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un proveedor
exports.deleteProveedor = async (req, res) => {
    try {
        await proveedorService.deleteProveedor(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
