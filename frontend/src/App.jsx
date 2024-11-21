import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/home/Home';
import UsuarioPage from './pages/usuario/UsuarioPage';
import ProveedorPage from './pages/proveedor/ProveedorPage';
import ProductoPage from './pages/producto/ProductoPage';

const App = () => {
    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Gestión</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/usuarios">Usuarios</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/proveedores">Proveedores</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/productos">Productos</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/usuarios" element={<UsuarioPage />} />
                    <Route path="/proveedores" element={<ProveedorPage />} />
                    <Route path="/productos" element={<ProductoPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
