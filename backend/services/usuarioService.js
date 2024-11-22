const Usuario = require('../models/Usuario');

class UsuarioService {
    async createUsuario(data) {
        try {
            const usuario = new Usuario(data);
            return await usuario.save();
        } catch (error) {
            throw new Error('Error al crear el usuario: ' + error.message);
        }
    }

    async getUsuarios() {
        try {
            return await Usuario.find();
        } catch (error) {
            throw new Error('Error al obtener los usuarios: ' + error.message);
        }
    }

    async updateUsuario(id, data) {
        try {
            const usuario = await Usuario.findByIdAndUpdate(id, data, { new: true });
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }
            return usuario;
        } catch (error) {
            throw new Error('Error al actualizar el usuario: ' + error.message);
        }
    }

    async deleteUsuario(id) {
        try {
            const usuario = await Usuario.findByIdAndDelete(id);
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }
            return usuario;
        } catch (error) {
            throw new Error('Error al eliminar el usuario: ' + error.message);
        }
    }
}

module.exports = new UsuarioService();
