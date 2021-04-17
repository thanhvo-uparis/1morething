<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>1-more-thing</title>
    <link rel="stylesheet" href="style.css">
    <script type="text/javascript" src="jquery-1.8.3.js"></script>
    <script type="text/javascript" src="assets/css/modal-dialog/material.min.js"></script>
    <script type="text/javascript" src="assets/css/modal-dialog/mdl-jquery-modal-dialog.js"></script>
    <script type="text/javascript" src="exercice.js"></script>
    <script type="text/javascript">
        jQuery.noConflict();
        jQuery(document).ready(function($) {
            $('#exercice').exercice({
                script  : 'connectors/jaoconnector.php',
                onclick : function(elem,type,file){}
            });
        });
    </script>

    <link href='https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined' rel='stylesheet' type='text/css'>
    <link href='assets/css/modal-dialog/mdl-jquery-modal-dialog.css' rel='stylesheet' type='text/css'>
    <link href='assets/css/modal-dialog/material.deep_orange-amber.min.css' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Archivo+Black' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Archivo+Narrow' rel='stylesheet' type='text/css'>
</head>
<body>
<?php
// obtenir la valeur de l'identifiant sur l'URL 
$id = !empty($_GET['id']) ? (int)$_GET['id'] : '';
?>
<div id="wrapper">
    <button type="button" class="add-new-localities">Ajoute une location</button>
    <div id="exercice" data-root="<?php echo htmlentities($id) ?>"></div>
</div>
</body>
</html>
