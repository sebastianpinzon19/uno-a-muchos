const Proveedor = require('../models/Proveedor');

// Crear un nuevo proveedor
exports.createProveedor = async (req, res) => {
    try {
        const proveedor = new Proveedor(req.body); // Crear una nueva instancia de Proveedor con los datos del cuerpo de la solicitud
        await proveedor.save(); // Guardar el proveedor en la base de datos
        res.status(201).json(proveedor); // Devolver el proveedor creado con un estado 201
    } catch (error) {
        res.status(400).json({ message: error.message }); // Manejo de errores, devolver un estado 400
    }
};

// Obtener todos los proveedores
exports.getProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.find(); // Obtener todos los proveedores de la base de datos
        res.json(proveedores); // Devolver la lista de proveedores
    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejo de errores, devolver un estado 500
    }
};

// Actualizar un proveedor existente
exports.updateProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Actualizar el proveedor
        if (!proveedor) {
            return res.status(404).json({ message: 'Proveedor no encontrado' }); // Manejo de errores si no se encuentra el proveedor
        }
        res.json(proveedor); // Devolver el proveedor actualizado
    } catch (error) {
        res.status(400).json({ message: error.message }); // Manejo de errores
    }
};

// Eliminar un proveedor
exports.deleteProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findByIdAndDelete(req.params.id); // Eliminar el proveedor
        if (!proveedor) {
            return res.status(404).json({ message: 'Proveedor no encontrado' }); // Manejo de errores si no se encuentra el proveedor
        }
        res.status(204).send(); // Devolver un estado 204 si se elimina correctamente
    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejo de errores
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
