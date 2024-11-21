# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Instrucciones para ejecutar el proyecto

1. Clona el repositorio en tu máquina local.
2. Navega al directorio del proyecto.
3. Instala las dependencias con `npm install`.
4. Inicia el servidor de desarrollo con `npm run dev`.

# Notas

- Asegúrate de que el backend esté funcionando correctamente en `http://localhost:5000`.
- Este proyecto utiliza React, Vite, Axios y Bootstrap para el frontend.

README del Proyecto: Gestión de Proveedores y Productos
Descripción del Proyecto
Este proyecto es una aplicación web que permite gestionar usuarios, proveedores y productos. La relación entre estos modelos es de uno a muchos, donde un proveedor puede tener múltiples productos asociados, y cada producto está vinculado a un único proveedor. Además, los usuarios pueden interactuar con estos datos, permitiendo la creación, actualización y eliminación de registros.
Estructura de la Aplicación
La aplicación está dividida en dos partes principales: el backend y el frontend.
Backend: Implementado en Node.js con Express y MongoDB, se encarga de manejar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para los modelos de usuario, proveedor y producto.
Frontend: Implementado en React, proporciona una interfaz de usuario para interactuar con el backend.
Relaciones de Uno a Muchos
Modelo de Datos
Usuario: Representa a los usuarios que pueden gestionar proveedores y productos.
Proveedor: Cada proveedor puede tener múltiples productos asociados.
Producto: Cada producto está vinculado a un único proveedor.
Diagrama de Relaciones
Usuario
   |
   | (gestiona)
   |
Proveedor
   |
   | (tiene)
   |
Producto
Implementación de Relaciones en el Código
Backend
1. Modelo de Proveedor
const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    contacto: { type: String, required: true },
    productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto' }] // Relación uno a muchos
});

const Proveedor = mongoose.model('Proveedor', proveedorSchema);
module.exports = Proveedor;
Explicación: En el modelo de Proveedor, se define un campo productos que es un array de IDs de productos. Esto establece la relación de uno a muchos, donde un proveedor puede tener múltiples productos.
2. Modelo de Producto
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true } // Relación muchos a uno
});

const Producto = mongoose.model('Producto', productoSchema);
module.exports = Producto;
Explicación: En el modelo de Producto, el campo proveedor es un ID que referencia a un proveedor. Esto establece la relación de muchos a uno, donde cada producto pertenece a un único proveedor.
Frontend
1. Componente ProveedorForm
const ProveedorForm = ({ proveedorSeleccionado, onProveedorActualizado }) => {
    const [nombre, setNombre] = useState('');
    const [contacto, setContacto] = useState('');

    useEffect(() => {
        if (proveedorSeleccionado) {
            setNombre(proveedorSeleccionado.nombre);
            setContacto(proveedorSeleccionado.contacto);
        }
    }, [proveedorSeleccionado]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { nombre, contacto };

        if (proveedorSeleccionado) {
            await fetch(`http://localhost:5000/api/proveedores/${proveedorSeleccionado._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            onProveedorActualizado(); // Actualiza la lista de proveedores
        } else {
            await fetch('http://localhost:5000/api/proveedores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            onProveedorActualizado(); // Actualiza la lista de proveedores
        }

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
Explicación: Este formulario permite crear o actualizar proveedores. Al enviar el formulario, se realiza una solicitud POST o PUT al backend, y se actualiza la lista de proveedores en la interfaz.
2. Componente ProductoForm
const ProductoForm = ({ proveedores, productoSeleccionado, onProductoActualizado }) => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [proveedor, setProveedor] = useState('');

    useEffect(() => {
        if (productoSeleccionado) {
            setNombre(productoSeleccionado.nombre);
            setPrecio(productoSeleccionado.precio);
            setProveedor(productoSeleccionado.proveedor);
        }
    }, [productoSeleccionado]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { nombre, precio, proveedor };

        if (productoSeleccionado) {
            await fetch(`http://localhost:5000/api/productos/${productoSeleccionado._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            onProductoActualizado(); // Actualiza la lista de productos
        } else {
            await fetch('http://localhost:5000/api/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            onProductoActualizado(); // Actualiza la lista de productos
        }

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
                    <option key={prov._id} value={prov._id}>{prov.nombre}</option>
                ))}
            </select>
            <button type="submit" className="btn btn-info">{productoSeleccionado ? 'Actualizar Producto' : 'Crear Producto'}</button>
        </form>
    );
};
Explicación: Este formulario permite crear o actualizar productos. Incluye un selector para elegir el proveedor asociado. Al enviar el formulario, se realiza una solicitud POST o PUT al backend, y se actualiza la lista de productos en la interfaz.
Conclusión
Este proyecto demuestra cómo implementar relaciones de uno a muchos en una aplicación web utilizando React y Node.js. Los proveedores pueden tener múltiples productos, y cada producto está vinculado a un único proveedor. La interfaz permite gestionar estos datos de manera eficiente, proporcionando una experiencia de usuario fluida y funcional.