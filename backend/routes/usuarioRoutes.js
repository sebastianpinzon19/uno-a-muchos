const express = require('express');
const { createUsuario, getUsuarios, updateUsuario, deleteUsuario } = require('../controllers/usuarioController');
const router = express.Router();

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Ana Gómez"
 *               email:
 *                 type: string
 *                 example: "ana.gomez@example.com"
 *               telefono:
 *                 type: string
 *                 example: "555-4321"
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d5f484f1a2c8b1f8e4e1a4"
 *                 nombre:
 *                   type: string
 *                   example: "Ana Gómez"
 *                 email:
 *                   type: string
 *                   example: "ana.gomez@example.com"
 *                 telefono:
 *                   type: string
 *                   example: "555-4321"
 *       400:
 *         description: Error en la creación
 */
router.post('/', createUsuario);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d5f484f1a2c8b1f8e4e1a4"
 *                   nombre:
 *                     type: string
 *                     example: "Ana Gómez"
 *                   email:
 *                     type: string
 *                     example: "ana.gomez@example.com"
 *                   telefono:
 *                     type: string
 *                     example: "555-4321"
 *       500:
 *         description: Error al obtener usuarios
 */
router.get('/', getUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Ana Gómez Actualizada"
 *               email:
 *                 type: string
 *                 example: "ana.gomez.updated@example.com"
 *               telefono:
 *                 type: string
 *                 example: "555-9876"
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d5f484f1a2c8b1f8e4e1a4"
 *                 nombre:
 *                   type: string
 *                   example: "Ana Gómez Actualizada"
 *                 email:
 *                   type: string
 *                   example: "ana.gomez.updated@example.com"
 *                 telefono:
 *                   type: string
 *                   example: "555-9876"
 *       400:
 *         description: Error en la actualización
 */
router.put('/:id', updateUsuario);

module.exports = router;
