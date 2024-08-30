<?php
require_once('Connection.php');

if (isset($_REQUEST['CourseID'])) {
    $CourseID = $_REQUEST['CourseID'];
}
if (isset($_REQUEST['PartID'])) {
    $PartID = $_REQUEST['PartID'];
}

if (isset($_REQUEST["operation"])) {
    $operation = $_REQUEST["operation"];
} else {
    $operation = "Default";
}

switch ($operation) {
    case "CourseInfo":
        $query = "SELECT * FROM CourseVedioInfo WHERE CourseID =?";
        $params = array($CourseID);
        $data = sqlsrv_query($conn, $query, $params, array("Scrollable" => "static")) or die(print_r(sqlsrv_errors(), true));

        $arr = array();
        while ($row = sqlsrv_fetch_object($data)) {
            $arr[] = $row;
        }

        header('Content-Type: application/json'); // Set Content-Type header
        echo json_encode($arr);
        break;

        case "CourseVedio":
            $query = "SELECT * FROM CourseVedioInfo WHERE PartID =?";
            $params = array($PartID);
            $data = sqlsrv_query($conn, $query, $params, array("Scrollable" => "static")) or die(print_r(sqlsrv_errors(), true));
    
            $arr = array();
            while ($row = sqlsrv_fetch_object($data)) {
                $arr[] = $row;
            }
    
            header('Content-Type: application/json'); // Set Content-Type header
            echo json_encode($arr);
            break;
    
    
    default:
        header('Content-Type: application/json'); // Set Content-Type header
        echo json_encode("Invalid operation.");
        break;
}
?>
