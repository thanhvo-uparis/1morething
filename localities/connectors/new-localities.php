<?php
include '../connection.php';
// obtenir une variable parentid et label
$parentid = !empty($_REQUEST['parentid']) ? (int)$_REQUEST['parentid'] : '';
$label = !empty($_REQUEST['label']) ? $_REQUEST['label'] : '';
// faire un nouvel ajout 'ajoute une location'
if ($label !== '') {
    $sql = "INSERT INTO location (label, parentId) VALUES (?,?)";
    $stmt= $pdo->prepare($sql);
    $stmt->execute(array($label, $parentid));
    echo json_encode(array('status' => true, 'id' => $pdo->lastInsertId(), 'label' => $label));
    die;
}
echo json_encode(array('status' => false));
die;