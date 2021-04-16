<?php
include '../connection.php';
// lấy biến id truyền từ js
$id = !empty($_REQUEST['id']) ? (int)$_REQUEST['id'] : '';
// thực hiện xóa
$sql = "DELETE FROM location WHERE id = ?";
$q = $pdo->prepare($sql);
$response = $q->execute(array($id));
echo json_encode(array('status' => true));
die;