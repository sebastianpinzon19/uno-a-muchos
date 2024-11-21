import React, { useState, useEffect } from 'react';

const ProveedorForm = ({ proveedorSeleccionado, onProveedorActualizado }) => {
    const [nombre, setNombre] = useState(''); // Estado para almacenar el nombre del proveedor
    const [contacto, setContacto] = useState(''); // Estado para almacenar el contacto del proveedor

    useEffect(() => {
        if (proveedorSeleccionado) {
            // Si hay un proveedor seleccionado, establecer los valores en el formulario
            setNombre(proveedorSeleccionado.nombre);
            setContacto(proveedorSeleccionado.contacto);
        }
    }, [proveedorSeleccionado]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        const data = { nombre, contacto }; // Crear un objeto con los datos del proveedor

        if (proveedorSeleccionado) {
            // Si se está editando un proveedor existente
            await fetch(`http://localhost:5000/api/proveedores/${proveedorSeleccionado._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Enviar los datos del proveedor al backend
            });
            onProveedorActualizado(); // Llamar a la función para actualizar la lista de proveedores
        } else {
            // Si se está creando un nuevo proveedor
            await fetch('http://localhost:5000/api/proveedores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Enviar los datos del proveedor al backend
            });
            onProveedorActualizado(); // Llamar a la función para actualizar la lista de proveedores
        }

        // Limpiar los campos del formulario
        setNombre('');
        setContacto('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <h2>{proveedorSeleccionado ? 'Actualizar Proveedor' : 'Crear Proveedor'}</h2>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="form-control mb-2"
            />
            <input
                type="text"
                placeholder="Contacto"
                value={contacto}
                onChange={(e) => setContacto(e.target.value)}
                required
                className="form-control mb-2"
            />
            <button type="submit" className="btn btn-success">{proveedorSeleccionado ? 'Actualizar Proveedor' : 'Crear Proveedor'}</button>
        </form>
    );
};

export default ProveedorForm;
