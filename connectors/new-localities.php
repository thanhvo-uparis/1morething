<?php
include '../connection.php';
// lấy biến parentid và label
$parentid = !empty($_REQUEST['parentid']) ? (int)$_REQUEST['parentid'] : '';
$label = !empty($_REQUEST['label']) ? $_REQUEST['label'] : '';
// thực hiện thêm mới
if ($label !== '') {
    $sql = "INSERT INTO location (label, parentId) VALUES (?,?)";
    $stmt= $pdo->prepare($sql);
    $stmt->execute(array($label, $parentid));
    echo json_encode(array('status' => true, 'id' => $pdo->lastInsertId(), 'label' => $label));
    die;
}
echo json_encode(array('status' => false));
die;