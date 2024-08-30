<?php
require_once("Connection.php");

if (isset($_REQUEST["UserEmail"]) && isset($_REQUEST["UserPassword"])){
    $Email = $_REQUEST["UserEmail"];
    $Password = $_REQUEST["UserPassword"];

    // Check if the user already exists
    $query = "SELECT COUNT(*) AS count FROM Users WHERE UserEmail = ? AND UserPassword = ?";
    $params = array($Email, $Password);
    $result = sqlsrv_query($conn, $query, $params);

    if ($result === false) {
        // Handle query execution error
        echo json_encode("Query execution error: " . print_r(sqlsrv_errors(), true));
    } else {
        $row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC);
        $count = $row['count'];

        if ($count > 0) {
            echo json_encode("Login successful");
        } else {
            echo json_encode("Email or password is incorrect");
        }
    }
}
?>

