import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsuarioForm from '../../components/UsuarioForm';

const UsuarioPage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/usuarios');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchUsuarios();
    }, []);

    const handleEliminar = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/api/usuarios/${id}`);
                setUsuarios(usuarios.filter(usuario => usuario._id !== id));
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleUsuarioActualizado = async () => {
        const response = await axios.get('http://localhost:5000/api/usuarios');
        setUsuarios(response.data);
        setUsuarioSeleccionado(null); // Limpiar la selección después de actualizar
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Usuarios</h2>
            <UsuarioForm usuarioSeleccionado={usuarioSeleccionado} onUsuarioActualizado={handleUsuarioActualizado} />
            <table className="table table-striped table-bordered mt-3">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario._id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => setUsuarioSeleccionado(usuario)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => handleEliminar(usuario._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsuarioPage;
