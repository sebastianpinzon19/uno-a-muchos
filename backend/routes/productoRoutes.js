const express = require('express');
const { createProducto, getProductos, updateProducto, deleteProducto } = require('../controllers/productoController');
const router = express.Router();

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Producto A"
 *               precio:
 *                 type: number
 *                 example: 150.75
 *               proveedor:
 *                 type: string
 *                 example: "60d5f484f1a2c8b1f8e4e1a2"  // ID del proveedor
 *     responses:
 *       201:
 *         description: Producto creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d5f484f1a2c8b1f8e4e1a3"
 *                 nombre:
 *                   type: string
 *                   example: "Producto A"
 *                 precio:
 *                   type: number
 *                   example: 150.75
 *                 proveedor:
 *                   type: string
 *                   example: "60d5f484f1a2c8b1f8e4e1a2"
 *       400:
 *         description: Error en la creación
 */
router.post('/', createProducto);

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d5f484f1a2c8b1f8e4e1a3"
 *                   nombre:
 *                     type: string
 *                     example: "Producto A"
 *                   precio:
 *                     type: number
 *                     example: 150.75
 *                   proveedor:
 *                     type: string
 *                     example: "60d5f484f1a2c8b1f8e4e1a2"
 *       500:
 *         description: Error al obtener productos
 */
router.get('/', getProductos);

/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
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
 *                 example: "Producto Actualizado"
 *               precio:
 *                 type: number
 *                 example: 200.00
 *               proveedor:
 *                 type: string
 *                 example: "60d5f484f1a2c8b1f8e4e1a2"
 *     responses:
 *       200:
 *         description: Producto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d5f484f1a2c8b1f8e4e1a3"
 *                 nombre:
 *                   type: string
 *                   example: "Producto Actualizado"
 *                 precio:
 *                   type: number
 *                   example: 200.00
 *                 proveedor:
 *                   type: string
 *                   example: "60d5f484f1a2c8b1f8e4e1a2"
 *       400:
 *         description: Error en la actualización
 */
router.put('/:id', updateProducto);

module.exports = router;
