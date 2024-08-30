<?php
require_once("Connection.php");

if (isset($_REQUEST["operation"])){
    $operation = $_REQUEST["operation"];
}
else{
    $operation = "Default";
}

switch ($operation) {

    case "SelectAll":
        //echo "Performing SelectAll operation...";
        // Add your code for SelectAll here
        $query = "select * from Portal";
        $data = sqlsrv_query($conn, $query, array(), array("Scrollable" => "static")) or die(print_r(sqlsrv_errors(), true));
        $arr = array();
        while($row = sqlsrv_fetch_Object($data)){
            $arr[] = $row;

        }
        echo json_encode($arr);
        //echo " SelectAll operation Done...";

        break;

    case "SelectOne":
        //echo "Performing SelectOne operation...";
        // Add your code for SelectOne here
        $PortalID = $_REQUEST["PortalID"];
        $query = "select * from Portal where PortalID = $PortalID";
        $data = sqlsrv_query($conn, $query, array(), array("Scrollable" => "static")) or die(print_r(sqlsrv_errors(), true));
        $arr = array();
        while($row = sqlsrv_fetch_Object($data)){
            $arr[] = $row;

        }
        echo json_encode($arr);
        //echo " SelectOne operation Done...";

        break;

    case "Insert":
        //echo "Performing Insert operation...";
        // Add your code for Insert here
        $PortalName = $_REQUEST["PortalName"];
        $PortalDescription = $_REQUEST["PortalDescription"];
        $IsActive = $_REQUEST["IsActive"];
        $query = "insert into Portal (PortalName , PortalDescription , IsActive) values (N'$PortalName', N'$PortalDescription' , $IsActive);select SCOPE_IDENTITY()";
        $result = sqlsrv_query($conn, $query , array() , array("Scrollable" => "static")) or  die( print_r( sqlsrv_errors(), true)) ;
        sqlsrv_next_result($result);
        sqlsrv_fetch($result);
        $PortalID = sqlsrv_get_field($result , 0);
        $response = array(
            "PortalID" => $PortalID,
            "PortalName" => $PortalName,
            "PortalDescription" => $PortalDescription,
            "IsActive" => $IsActive,
        );
        echo json_encode($response);
        //echo " Insert operation Done...";

        break;

    case "Update":
        //echo "Performing Update operation...";
        // Add your code for Edit here
        $PortalID = $_REQUEST["PortalID"];
        $PortalName = $_REQUEST["PortalName"];
        $PortalDescription = $_REQUEST["PortalDescription"];
        $IsActive = $_REQUEST["IsActive"];
        $query = "update Portal set PortalName= N'$PortalName', PortalDescription= N'$PortalDescription', IsActive = $IsActive where PortalID = $PortalID";
        sqlsrv_query($conn, $query , array() , array("Scrollable" => "static")) or  die( print_r( sqlsrv_errors(), true)) ;
        $response = array(
            "PortalID" => $PortalID,
            "PortalName" => $PortalName,
            "PortalDescription" => $PortalDescription,
            "IsActive" => $IsActive,
        );
        echo json_encode($response);
        //echo " Update operation Done...";

        break;

    case "Delete":
        //echo "Performing Delete operation...";
        // Add your code for Delete here
        $PortalID = $_REQUEST["PortalID"];
        $query = "delete from Portal where PortalID = $PortalID";
        $result = sqlsrv_query($conn, $query , array() , array("Scrollable" => "static")) or  die( print_r( sqlsrv_errors(), true)) ; 
        echo json_encode('Record deleted successfuly!');
        //echo " Delete operation Done...";

        break;

    default:
        echo json_encode("Invalid operation.");
        // Add default code for handling invalid operations
        break;
}


?>