<?php 
include '../connection.php';
$id = !empty($_REQUEST['id']) ? (int)$_REQUEST['id'] : '';
$query = $pdo->prepare("SELECT * FROM location WHERE parentId = ?");
$query->execute(array($id));
$results = $query->fetchAll();
$dirs = array();
foreach ($results as $result) {
    $dirs[] = array('id' => $result['id'], 'label' => $result['label'], 'parentId' => $result['parentId']);
}
echo json_encode($dirs);
?>
