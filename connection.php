<?php
try{
    $dbhost = 'localhost';
    $dbname = '1morething';
    $dbuser = 'root';
    $dbpass = '';
    $pdo = new PDO("mysql:host={$dbhost};dbname={$dbname}",$dbuser,$dbpass);
    $pdo->exec("set names utf8");
}catch(PDOException $ex){
    die($ex->getMessage());
}