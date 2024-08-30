<?php
// Connect to the database
$serverName ="DESKTOP-QHQBMKT\SQLEXPRESS"; 
$password = ""; 
$userId ="";
$database = "dbEduPlatform";
$connectionInfo = array( "Database"=>$database, "UID"=> $userId, "PWD"=>$password,"CharacterSet" => "UTF-8"); 
$conn = sqlsrv_connect( $serverName, $connectionInfo);
if( ! $conn ) { 
  die( print_r( sqlsrv_errors(), true)); 
}

?> 