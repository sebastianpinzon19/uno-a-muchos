const Proveedor = require('../models/Proveedor');

class ProveedorService {
    async createProveedor(data) {
        try {
            const proveedor = new Proveedor(data);
            return await proveedor.save();
        } catch (error) {
            throw new Error('Error al crear el proveedor: ' + error.message);
        }
    }

    async getProveedores() {
        try {
            return await Proveedor.find();
        } catch (error) {
            throw new Error('Error al obtener los proveedores: ' + error.message);
        }
    }

    async updateProveedor(id, data) {
        try {
            const proveedor = await Proveedor.findByIdAndUpdate(id, data, { new: true });
            if (!proveedor) {
                throw new Error('Proveedor no encontrado');
            }
            return proveedor;
        } catch (error) {
            throw new Error('Error al actualizar el proveedor: ' + error.message);
        }
    }

    async deleteProveedor(id) {
        try {
            const proveedor = await Proveedor.findByIdAndDelete(id);
            if (!proveedor) {
                throw new Error('Proveedor no encontrado');
            }
            return proveedor;
        } catch (error) {
            throw new Error('Error al eliminar el proveedor: ' + error.message);
        }
    }
}

module.exports = new ProveedorService();
