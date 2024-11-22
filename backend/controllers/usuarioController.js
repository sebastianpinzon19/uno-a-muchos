const usuarioService = require('../services/usuarioService');

exports.createUsuario = async (req, res) => {
    try {
        const usuario = await usuarioService.createUsuario(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.getUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUsuario = async (req, res) => {
    try {
        const usuario = await usuarioService.updateUsuario(req.params.id, req.body);
        res.json(usuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUsuario = async (req, res) => {
    try {
        await usuarioService.deleteUsuario(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
