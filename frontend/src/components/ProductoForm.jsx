import React, { useState, useEffect } from 'react';

const ProductoForm = ({ proveedores, productoSeleccionado, onProductoActualizado }) => {
    const [nombre, setNombre] = useState(''); // Estado para almacenar el nombre del producto
    const [precio, setPrecio] = useState(''); // Estado para almacenar el precio del producto
    const [proveedor, setProveedor] = useState(''); // Estado para almacenar el proveedor seleccionado

    useEffect(() => {
        if (productoSeleccionado) {
            // Si hay un producto seleccionado, establecer los valores en el formulario
            setNombre(productoSeleccionado.nombre);
            setPrecio(productoSeleccionado.precio);
            setProveedor(productoSeleccionado.proveedor);
        }
    }, [productoSeleccionado]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        const data = { nombre, precio, proveedor }; // Crear un objeto con los datos del producto

        if (productoSeleccionado) {
            // Si se está editando un producto existente
            await fetch(`http://localhost:5000/api/productos/${productoSeleccionado._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Enviar los datos del producto al backend
            });
            onProductoActualizado(); // Llamar a la función para actualizar la lista de productos
        } else {
            // Si se está creando un nuevo producto
            await fetch('http://localhost:5000/api/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Enviar los datos del producto al backend
            });
            onProductoActualizado(); // Llamar a la función para actualizar la lista de productos
        }

        // Limpiar los campos del formulario
        setNombre('');
        setPrecio('');
        setProveedor('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <h2>{productoSeleccionado ? 'Actualizar Producto' : 'Crear Producto'}</h2>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="form-control mb-2"
            />
            <input
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
                className="form-control mb-2"
            />
            <select
                value={proveedor}
                onChange={(e) => setProveedor(e.target.value)}
                required
                className="form-control mb-2"
            >
                <option value="">Selecciona un Proveedor</option>
                {proveedores.map((prov) => (
                    <option key={prov._id} value={prov._id}>{prov.nombre}</option> // Mostrar proveedores en el selector
                ))}
            </select>
            <button type="submit" className="btn btn-info">{productoSeleccionado ? 'Actualizar Producto' : 'Crear Producto'}</button>
        </form>
    );
};

export default ProductoForm;
