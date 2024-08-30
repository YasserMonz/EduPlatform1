<?php
require_once("Connection.php");

if (isset($_REQUEST["Email"]) && isset($_REQUEST["Password"])){
    $Email = $_REQUEST["Email"];
    $Password = $_REQUEST["Password"];

    $query = "select UserEmail, UserPassword from Users where UserEmail = N'$Email' and UserPassword = N'$Password'";
    $data = sqlsrv_query($conn, $query, array(), array("Scrollable" => "static")) or die(print_r(sqlsrv_errors(), true));
    $arr = array();
    while($row = sqlsrv_fetch_Object($data)){
        $arr[] = $row;

    }
    if (count($arr) > 0){
        //echo json_encode($arr);
        echo json_encode("True");
    }
    else{
        // Login failed
        //echo json_encode("Email or Password is incorrect.");
        echo json_encode("False");
    }
}

?>