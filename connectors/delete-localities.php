<?php
include '../connection.php';
// récupère la variable id, transmis de js
$id = !empty($_REQUEST['id']) ? (int)$_REQUEST['id'] : '';
// effectuer la suppression
$sql = "DELETE FROM location WHERE id = ?";
$q = $pdo->prepare($sql);
$response = $q->execute(array($id));
echo json_encode(array('status' => true));
die;