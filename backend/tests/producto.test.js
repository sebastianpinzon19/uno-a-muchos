const request = require('supertest');
const app = require('../server');

describe('Productos API', () => {
    it('debería crear un nuevo producto', async () => {
        const proveedorResponse = await request(app)
            .post('/api/proveedores')
            .send({
                nombre: 'Proveedor Test',
                contacto: 'Contacto Test',
                telefono: '123456789'
            });

        const response = await request(app)
            .post('/api/productos')
            .send({
                nombre: 'Producto Test',
                precio: 100,
                proveedor: proveedorResponse.body._id
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
    });

    it('debería obtener todos los productos', async () => {
        const response = await request(app).get('/api/productos');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('debería actualizar un producto existente', async () => {
        const proveedorResponse = await request(app)
            .post('/api/proveedores')
            .send({
                nombre: 'Proveedor Test',
                contacto: 'Contacto Test',
                telefono: '123456789'
            });

        const newProducto = await request(app)
            .post('/api/productos')
            .send({
                nombre: 'Producto Test',
                precio: 100,
                proveedor: proveedorResponse.body._id
            });

        const response = await request(app)
            .put(`/api/productos/${newProducto.body._id}`)
            .send({
                nombre: 'Producto Actualizado'
            });
        expect(response.status).toBe(200);
        expect(response.body.nombre).toBe('Producto Actualizado');
    });

    it('debería eliminar un producto existente', async () => {
        const proveedorResponse = await request(app)
            .post('/api/proveedores')
            .send({
                nombre: 'Proveedor Test',
                contacto: 'Contacto Test',
                telefono: '123456789'
            });

        const newProducto = await request(app)
            .post('/api/productos')
            .send({
                nombre: 'Producto Test',
                precio: 100,
                proveedor: proveedorResponse.body._id
            });

        const response = await request(app)
            .delete(`/api/productos/${newProducto.body._id}`);
        expect(response.status).toBe(204);
    });
});
