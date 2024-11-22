const request = require('supertest');
const app = require('../server');

describe('Proveedores API', () => {
    it('debería crear un nuevo proveedor', async () => {
        const response = await request(app)
            .post('/api/proveedores')
            .send({
                nombre: 'Proveedor Test',
                contacto: 'Contacto Test',
                telefono: '123456789'
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
    });

    it('debería obtener todos los proveedores', async () => {
        const response = await request(app).get('/api/proveedores');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('debería actualizar un proveedor existente', async () => {
        const newProveedor = await request(app)
            .post('/api/proveedores')
            .send({
                nombre: 'Proveedor Test',
                contacto: 'Contacto Test',
                telefono: '123456789'
            });

        const response = await request(app)
            .put(`/api/proveedores/${newProveedor.body._id}`)
            .send({
                nombre: 'Proveedor Actualizado'
            });
        expect(response.status).toBe(200);
        expect(response.body.nombre).toBe('Proveedor Actualizado');
    });

    it('debería eliminar un proveedor existente', async () => {
        const newProveedor = await request(app)
            .post('/api/proveedores')
            .send({
                nombre: 'Proveedor Test',
                contacto: 'Contacto Test',
                telefono: '123456789'
            });

        const response = await request(app)
            .delete(`/api/proveedores/${newProveedor.body._id}`);
        expect(response.status).toBe(204);
    });
});
