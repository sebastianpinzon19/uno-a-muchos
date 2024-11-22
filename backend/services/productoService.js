const Producto = require('../models/Producto');

class ProductoService {
    async createProducto(data) {
        try {
            const producto = new Producto(data);
            return await producto.save();
        } catch (error) {
            throw new Error('Error al crear el producto: ' + error.message);
        }
    }

    async getProductos() {
        try {
            return await Producto.find().populate('proveedor');
        } catch (error) {
            throw new Error('Error al obtener los productos: ' + error.message);
        }
    }

    async updateProducto(id, data) {
        try {
            const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
            if (!producto) {
                throw new Error('Producto no encontrado');
            }
            return producto;
        } catch (error) {
            throw new Error('Error al actualizar el producto: ' + error.message);
        }
    }

    async deleteProducto(id) {
        try {
            const producto = await Producto.findByIdAndDelete(id);
            if (!producto) {
                throw new Error('Producto no encontrado');
            }
            return producto;
        } catch (error) {
            throw new Error('Error al eliminar el producto: ' + error.message);
        }
    }
}

module.exports = new ProductoService();
