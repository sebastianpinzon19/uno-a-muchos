import React, { useState, useEffect } from 'react';

const UsuarioForm = ({ usuarioSeleccionado, onUsuarioActualizado }) => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (usuarioSeleccionado) {
            setNombre(usuarioSeleccionado.nombre);
            setEmail(usuarioSeleccionado.email);
        }
    }, [usuarioSeleccionado]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { nombre, email };

        if (usuarioSeleccionado) {
            await fetch(`http://localhost:5000/api/usuarios/${usuarioSeleccionado._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            onUsuarioActualizado();
        } else {
            await fetch('http://localhost:5000/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            onUsuarioActualizado();
        }

        setNombre('');
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <h2>{usuarioSeleccionado ? 'Actualizar Usuario' : 'Crear Usuario'}</h2>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="form-control mb-2"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control mb-2"
            />
            <button type="submit" className="btn btn-success">{usuarioSeleccionado ? 'Actualizar Usuario' : 'Crear Usuario'}</button>
        </form>
    );
};

export default UsuarioForm;
