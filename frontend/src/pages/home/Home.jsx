import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container text-center mt-5">
            <h1 className="display-4">Bienvenido a la Gestión</h1>
            <p className="lead">Selecciona una opción para comenzar a gestionar:</p>
            <div className="btn-group mt-4" role="group" aria-label="Basic example">
                <Link to="/usuarios" className="btn btn-primary btn-lg">Usuarios</Link>
                <Link to="/proveedores" className="btn btn-success btn-lg">Proveedores</Link>
                <Link to="/productos" className="btn btn-info btn-lg">Productos</Link>
            </div>
        </div>
    );
};

export default Home;
