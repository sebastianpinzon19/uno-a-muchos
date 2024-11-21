import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductoForm from '../../components/ProductoForm';

const ProductoPage = () => {
    const [productos, setProductos] = useState([]); // Estado para almacenar la lista de productos
    const [proveedores, setProveedores] = useState([]); // Estado para almacenar la lista de proveedores
    const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Estado para almacenar el producto seleccionado para editar

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/productos'); // Obtener la lista de productos desde el backend
                setProductos(response.data); // Actualizar el estado con los productos obtenidos
            } catch (error) {
                console.error('Error:', error); // Manejo de errores
            }
        };

        const fetchProveedores = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/proveedores'); // Obtener la lista de proveedores desde el backend
                setProveedores(response.data); // Actualizar el estado con los proveedores obtenidos
            } catch (error) {
                console.error('Error:', error); // Manejo de errores
            }
        };

        fetchProductos(); // Llamar a la función para obtener productos
        fetchProveedores(); // Llamar a la función para obtener proveedores
    }, []);

    const handleEliminar = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?'); // Confirmación de eliminación
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/api/productos/${id}`); // Eliminar el producto seleccionado
                setProductos(productos.filter(producto => producto._id !== id)); // Actualizar la lista de productos después de la eliminación
            } catch (error) {
                console.error('Error:', error); // Manejo de errores
            }
        }
    };

    const handleProductoActualizado = async () => {
        const response = await axios.get('http://localhost:5000/api/productos'); // Obtener la lista actualizada de productos
        setProductos(response.data); // Actualizar el estado con los productos obtenidos
        setProductoSeleccionado(null); // Limpiar la selección después de actualizar
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Productos</h2>
            <ProductoForm proveedores={proveedores} productoSeleccionado={productoSeleccionado} onProductoActualizado={handleProductoActualizado} />
            <table className="table table-striped table-bordered mt-3">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Proveedor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto._id}>
                            <td>{producto.nombre}</td>
                            <td>${producto.precio}</td>
                            <td>{producto.proveedor?.nombre}</td> {/* Mostrar el nombre del proveedor asociado */}
                            <td>
                                <button className="btn btn-warning" onClick={() => setProductoSeleccionado(producto)}>Editar</button> {/* Botón para editar el producto */}
                                <button className="btn btn-danger" onClick={() => handleEliminar(producto._id)}>Eliminar</button> {/* Botón para eliminar el producto */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductoPage;
