<?php

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <title>Sistema de Reserva de Habitaciones</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./estilos.css">
</head>
<body>
    <div class="div-titulo">
        <h1>Sistema de Reserva de Habitaciones</h1>
    </div>
    
    <div class="contenedor">

        <div class="div-formulario">
            <h2>Formulario de Reserva</h2>

            <form action="#" id="formulario">
                <input type="hidden" id="id">
                <input type="text" id="nombre" placeholder="Nombre del cliente">
                <input type="email" id="correo" placeholder="Correo electrónico">
                <input type="date" id="fecha_ingreso" placeholder="Fecha de ingreso">
                <input type="date" id="fecha_salida" placeholder="Fecha de salida">
                <select id="categoria">
                    <option value="turista">Turista</option>
                    <option value="premium">Premium</option>
                </select>
                <button type="submit" id="btnReservar">Reservar</button>
            </form>
        </div>

        <div class="div-listado">
            <h2>Listado de Reservas</h2>
            <div class="div-reservas">
                
            </div>
        </div>

    </div>

    <script src="./app.js"></script>
</body>
</html>