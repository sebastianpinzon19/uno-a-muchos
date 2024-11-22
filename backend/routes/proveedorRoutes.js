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
 *                 example: "Proveedor XYZ"
 *               contacto:
 *                 type: string
 *                 example: "Carlos Martínez"
 *               telefono:
 *                 type: string
 *                 example: "555-9876"
 *     responses:
 *       201:
 *         description: Proveedor creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d5f484f1a2c8b1f8e4e1a2"
 *                 nombre:
 *                   type: string
 *                   example: "Proveedor XYZ"
 *                 contacto:
 *                   type: string
 *                   example: "Carlos Martínez"
 *                 telefono:
 *                   type: string
 *                   example: "555-9876"
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d5f484f1a2c8b1f8e4e1a2"
 *                   nombre:
 *                     type: string
 *                     example: "Proveedor XYZ"
 *                   contacto:
 *                     type: string
 *                     example: "Carlos Martínez"
 *                   telefono:
 *                     type: string
 *                     example: "555-9876"
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
 *                 example: "Proveedor Actualizado"
 *               contacto:
 *                 type: string
 *                 example: "Juan Pérez"
 *               telefono:
 *                 type: string
 *                 example: "555-1234"
 *     responses:
 *       200:
 *         description: Proveedor actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d5f484f1a2c8b1f8e4e1a2"
 *                 nombre:
 *                   type: string
 *                   example: "Proveedor Actualizado"
 *                 contacto:
 *                   type: string
 *                   example: "Juan Pérez"
 *                 telefono:
 *                   type: string
 *                   example: "555-1234"
 *       400:
 *         description: Error en la actualización
 */
router.put('/:id', updateProveedor);

module.exports = router;
