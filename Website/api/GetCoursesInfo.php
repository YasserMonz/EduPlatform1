<?php
require_once("Connection.php");

$CoursesNumber = 3;

if (isset($_REQUEST["operation"])) {
    $operation = $_REQUEST["operation"];
} else {
    $operation = "Default";
}

switch ($operation) {

    case "TopViewed":
        $query = "SELECT TOP $CoursesNumber * FROM vwCourses ORDER BY NumberofViews DESC";
        $data = sqlsrv_query($conn, $query, array(), array("Scrollable" => "static")) or die(print_r(sqlsrv_errors(), true));
        $arr = array();
        while ($row = sqlsrv_fetch_object($data)) {
            $arr[] = $row;
        }
        echo json_encode($arr);
        break;

    case "Latest":
        $query = "SELECT TOP $CoursesNumber * FROM vwCourses ORDER BY CreateDate DESC";
        $data = sqlsrv_query($conn, $query, array(), array("Scrollable" => "static")) or die(print_r(sqlsrv_errors(), true));
        $arr = array();
        while ($row = sqlsrv_fetch_object($data)) {
            $arr[] = $row;
        }
        echo json_encode($arr);
        break;

    case "Random":
        $query = "SELECT TOP $CoursesNumber * FROM vwCourses ORDER BY NEWID() ";
        $data = sqlsrv_query($conn, $query, array(), array("Scrollable" => "static")) or die(print_r(sqlsrv_errors(), true));
        $arr = array();
        while ($row = sqlsrv_fetch_object($data)) {
            $arr[] = $row;
        }
        echo json_encode($arr);
        break;

    default:
        echo json_encode("Invalid operation.");
        break;
}
?>
