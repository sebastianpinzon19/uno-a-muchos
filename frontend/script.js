document.addEventListener('DOMContentLoaded', () => {
    loadForm('usuario', 'usuario-form');
    loadForm('proveedor', 'proveedor-form');
    loadForm('producto', 'producto-form');
});

function loadForm(type, containerId) {
    const container = document.getElementById(containerId);
    let formHtml = '';

    if (type === 'usuario') {
        formHtml = `
            <form id="usuarioForm">
                <input type="text" name="nombre" placeholder="Nombre" required>
                <input type="email" name="email" placeholder="Email" required>
                <button type="submit">Crear Usuario</button>
            </form>
        `;
    } else if (type === 'proveedor') {
        formHtml = `
            <form id="proveedorForm">
                <input type="text" name="nombre" placeholder="Nombre" required>
                <input type="text" name="contacto" placeholder="Contacto" required>
                <button type="submit">Crear Proveedor</button>
            </form>
        `;
    } else if (type === 'producto') {
        formHtml = `
            <form id="productoForm">
                <input type="text" name="nombre" placeholder="Nombre" required>
                <input type="number" name="precio" placeholder="Precio" required>
                <button type="submit">Crear Producto</button>
            </form>
        `;
    }

    container.innerHTML = formHtml;

    // Agregar el evento de envío del formulario
    document.getElementById(`${type}Form`).addEventListener('submit', (e) => {
        e.preventDefault();
        submitForm(type);
    });
}

function submitForm(type) {
    const form = document.getElementById(`${type}Form`);
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch(`http://localhost:5000/api/${type === 'usuario' ? 'usuarios' : type}s`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        form.reset(); // Limpiar el formulario
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
