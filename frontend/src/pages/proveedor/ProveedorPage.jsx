import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProveedorForm from '../../components/ProveedorForm';

const ProveedorPage = () => {
    const [proveedores, setProveedores] = useState([]); // Estado para almacenar la lista de proveedores
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null); // Estado para almacenar el proveedor seleccionado para editar

    useEffect(() => {
        const fetchProveedores = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/proveedores'); // Obtener la lista de proveedores desde el backend
                setProveedores(response.data); // Actualizar el estado con los proveedores obtenidos
            } catch (error) {
                console.error('Error:', error); // Manejo de errores
            }
        };
        fetchProveedores(); // Llamar a la función para obtener proveedores
    }, []);

    const handleEliminar = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este proveedor?'); // Confirmación de eliminación
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/api/proveedores/${id}`); // Eliminar el proveedor seleccionado
                setProveedores(proveedores.filter(proveedor => proveedor._id !== id)); // Actualizar la lista de proveedores después de la eliminación
            } catch (error) {
                console.error('Error:', error); // Manejo de errores
            }
        }
    };

    const handleProveedorActualizado = async () => {
        const response = await axios.get('http://localhost:5000/api/proveedores'); // Obtener la lista actualizada de proveedores
        setProveedores(response.data); // Actualizar el estado con los proveedores obtenidos
        setProveedorSeleccionado(null); // Limpiar la selección después de actualizar
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Proveedores</h2>
            <ProveedorForm proveedorSeleccionado={proveedorSeleccionado} onProveedorActualizado={handleProveedorActualizado} />
            <table className="table table-striped table-bordered mt-3">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Contacto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.map(proveedor => (
                        <tr key={proveedor._id}>
                            <td>{proveedor.nombre}</td>
                            <td>{proveedor.contacto}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => setProveedorSeleccionado(proveedor)}>Editar</button> {/* Botón para editar el proveedor */}
                                <button className="btn btn-danger" onClick={() => handleEliminar(proveedor._id)}>Eliminar</button> {/* Botón para eliminar el proveedor */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProveedorPage;



