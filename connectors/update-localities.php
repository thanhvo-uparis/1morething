<?php
include '../connection.php';
// lấy biến id và new_label
$id = !empty($_REQUEST['id']) ? (int)$_REQUEST['id'] : '';
$new_label = !empty($_REQUEST['new_label']) ? $_REQUEST['new_label'] : '';
if ($new_label !== '' && $id !== '') {
    // thực hiện cập nhât
    $sql = "UPDATE location SET label=? WHERE id=?";
    $stmt= $pdo->prepare($sql);
    $stmt->execute(array($new_label, $id));

    echo json_encode(array('status' => true));
    die;
}
echo json_encode(array('status' => false));
die;