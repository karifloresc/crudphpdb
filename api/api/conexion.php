<?php
header('Content-Type: application/json');

$pdo = new PDO('mysql:host=localhost;dbname='pacific_reef', 'root', '');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM reservas');
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO reservas (nombre, correo, fecha_ingreso, fecha_salida, categoria) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([$data['nombre'], $data['correo'], $data['fecha_ingreso'], $data['fecha_salida'], $data['categoria']]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('UPDATE reservas SET nombre = ?, correo = ?, fecha_ingreso = ?, fechafecha_salida = ?, categoria = ? WHERE id = ?');
        $stmt->execute([$data['nombre'], $data['correo'], $data['fecha_ingreso'], $data['fecha_salida'], $data['categoria'], $data['id']]);
        echo json_encode(['success' => true]);
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $stmt = $pdo->prepare('DELETE FROM reservas WHERE id = ?');
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        break;
}
?>