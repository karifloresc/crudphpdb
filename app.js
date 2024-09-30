let editando = false;

const formulario = document.querySelector('#formulario');
const idInput = document.querySelector('#id');
const nombreInput = document.querySelector('#nombre');
const correoInput = document.querySelector('#correo');
const fecha_ingresoInput = document.querySelector('#fecha_ingreso');
const fecha_salidaInput = document.querySelector('#fecha_salida');
const categoriaInput = document.querySelector('#categoria');
const btnReservarInput = document.querySelector('#btnReservar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || correoInput.value === '' || fecha_ingresoInput.value === '' || fecha_salidaInput.value === '' || categoriaInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarReserva();
        editando = false;
    } else {
        agregarReserva();
    }
}

function agregarReserva() {
    const reserva = {
        nombre: nombreInput.value,
        correo: correoInput.value,
        fecha_ingreso: fecha_ingresoInput.value,
        fecha_salida: fecha_salidaInput.value,
        categoria: categoriaInput.value
    };

    fetch('reservas.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reserva)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error: ' + data.error);
        } else {
            mostrarReservas();
            formulario.reset();
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });
}

function mostrarReservas() {
    fetch('reservas.php')
    .then(response => response.json())
    .then(data => {
        limpiarHTML();
        const divReservas = document.querySelector('.div-reservas');
        
        data.forEach(reserva => {
            const {id, nombre, correo, fecha_ingreso, fecha_salida, categoria} = reserva;

            const parrafo = document.createElement('p');
            parrafo.textContent = `${id} - ${nombre} - ${correo} - ${fecha_ingreso} - ${fecha_salida} - ${categoria} - `;
            parrafo.dataset.id = id;

            const editarBoton = document.createElement('button');
            editarBoton.onclick = () => cargarReserva(reserva);
            editarBoton.textContent = 'Editar';
            editarBoton.classList.add('btn', 'btn-editar');
            parrafo.append(editarBoton);

            const eliminarBoton = document.createElement('button');
            eliminarBoton.onclick = () => eliminarReserva(id);
            eliminarBoton.textContent = 'Eliminar';
            eliminarBoton.classList.add('btn', 'btn-eliminar');
            parrafo.append(eliminarBoton);

            const hr = document.createElement('hr');

            divReservas.appendChild(parrafo);
            divReservas.appendChild(hr);
        });
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });
}

function cargarReserva(reserva) {
    const {id, nombre, correo, fecha_ingreso, fecha_salida, categoria} = reserva;

    idInput.value = id;
    nombreInput.value = nombre;
    correoInput.value = correo;
    fecha_ingresoInput.value = fecha_ingreso;
    fecha_salidaInput.value = fecha_salida;
    categoriaInput.value = categoria;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarReserva() {
    const reserva = {
        id: idInput.value,
        nombre: nombreInput.value,
        correo: correoInput.value,
        fecha_ingreso: fecha_ingresoInput.value,
        fecha_salida: fecha_salidaInput.value,
        categoria: categoriaInput.value
    };

    fetch('reservas.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reserva)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error: ' + data.error);
        } else {
            mostrarReservas();
            formulario.reset();
            formulario.querySelector('button[type="submit"]').textContent = 'Reservar';
            editando = false;
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });
}

function eliminarReserva(id) {
    fetch(`reservas.php?id=${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error: ' + data.error);
        } else {
            mostrarReservas();
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });
}

function limpiarHTML() {
    const divReservas = document.querySelector('.div-reservas');
    while(divReservas.firstChild) {
        divReservas.removeChild(divReservas.firstChild);
    }
}

// Mostrar reservas al cargar la página
mostrarReservas();