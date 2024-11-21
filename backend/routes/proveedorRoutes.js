const express = require('express');
const { createProveedor, getProveedores, updateProveedor, deleteProveedor } = require('../controllers/proveedorController');
const router = express.Router();

/**
 * @swagger
 * /api/proveedores:
 *   post:
 *     summary: Crear un nuevo proveedor
 *     tags: [Proveedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               contacto:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       201:
 *         description: Proveedor creado
 *       400:
 *         description: Error en la creación
 */
router.post('/', createProveedor);

/**
 * @swagger
 * /api/proveedores:
 *   get:
 *     summary: Obtener todos los proveedores
 *     tags: [Proveedores]
 *     responses:
 *       200:
 *         description: Lista de proveedores
 *       500:
 *         description: Error al obtener proveedores
 */
router.get('/', getProveedores);

/**
 * @swagger
 * /api/proveedores/{id}:
 *   put:
 *     summary: Actualizar un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proveedor
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
 *               contacto:
 *                 type: string
 *               telefono:
 *                 type: string
 *     responses:
 *       200:
 *         description: Proveedor actualizado
 *       400:
 *         description: Error en la actualización
 */
router.put('/:id', updateProveedor);

/**
 * @swagger
 * /api/proveedores/{id}:
 *   delete:
 *     summary: Eliminar un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proveedor
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Proveedor eliminado
 *       500:
 *         description: Error al eliminar proveedor
 */
router.delete('/:id', deleteProveedor);

module.exports = router;
