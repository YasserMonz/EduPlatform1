<?php
require_once("Connection.php");
require "../../vendor/autoload.php";
use \Firebase\JWT\JWT;

if (!isset($_REQUEST["UserEmail"]) || !isset($_REQUEST["UserPassword"])) {
    die(json_encode(array("state" => "fail", "msg" => "Email or password cannot be empty")));
}

$Email = $_REQUEST["UserEmail"];
$Password = $_REQUEST["UserPassword"];
$arr = array();

$query = "SELECT UserID, UserFirstName + ' ' + UserLastName AS UserFullName, UserType, UserPassword FROM Users WHERE UserEmail = ?";
$param = [$Email];
$result = sqlsrv_query($conn, $query, $param, array("Scrollable" => 'static'));

if ($result === false) {
    die(json_encode(array("state" => "fail", "msg" => "Query execution error: " . print_r(sqlsrv_errors(), true))));
}

if (sqlsrv_num_rows($result) == 0) {
    $arr['state'] = 'fail';
    $arr['msg'] = 'Invalid username or password';
} else {
    sqlsrv_fetch($result);
    $UserID = sqlsrv_get_field($result, 0);
    $UserFullName = sqlsrv_get_field($result, 1);
    $UserType = sqlsrv_get_field($result, 2);
    $UserPassword = sqlsrv_get_field($result, 3);

    if ($UserPassword != $Password) {
        // If passwords are hashed, replace the above line with:
        // if (!password_verify($Password, $UserPassword)) {
        $arr['state'] = 'fail';
        $arr['msg'] = 'Invalid username or password';
    } else {
        $secretKey = "123456"; // Add your secret key here
        $issuedAt = time();
        $expirationTime = $issuedAt + 3600; // 1 hour expiration
        $payload = array(
            "UserID" => $UserID,
            "UserFullName" => $UserFullName,
            "UserEmail" => $Email,
            "UserType" => $UserType,
            "iat" => $issuedAt,
            "exp" => $expirationTime
        );
        $jwt = JWT::encode($payload, $secretKey, 'HS256');
        $arr['state'] = 'success';
        $arr['jwt'] = $jwt;
    }
}

echo json_encode($arr);
sqlsrv_close($conn);
?>
