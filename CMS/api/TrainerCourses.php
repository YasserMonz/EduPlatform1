<?php
require_once("Connection.php");

if (isset($_REQUEST["TrainerID"])){
    $UserID = $_REQUEST["TrainerID"];
}

if (isset($_REQUEST["operation"])){
    $operation = $_REQUEST["operation"]; // Replace this with the desired operation
}
else{
    $operation = "Default";
}

switch ($operation) {

    case "SelectAll":
        //echo "Performing SelectAll operation...";
        // Add your code for SelectAll here
        $query = "select * from Course where UserID = $UserID";
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
        $CourseID = $_REQUEST["CourseID"];
        $query = "select * from Course where CourseID = $CourseID";
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
        $CourseName = $_REQUEST["CourseName"];
        $CourseDescription = $_REQUEST["CourseDescription"];
        $CoursePrice = $_REQUEST["CoursePrice"];
        $TrainerShareRate = $_REQUEST["TrainerShareRate"];
        $CreateDate = $_REQUEST["CreateDate"];
        $IsActive = $_REQUEST["IsActive"];
        $TrainerID = $_REQUEST["TrainerID"];
        $PortalID = $_REQUEST["PortalID"];
        $query = "insert into Course (CourseName , CourseDescription , CoursePrice , TrainerShareRate , CreateDate , IsActive , TrainerID , PortalID) 
                    values (N'$CourseName', N'$CourseDescription' , '$CoursePrice' , '$TrainerShareRate' , '$CreateDate' , $IsActive , $TrainerID , $PortalID)
                    ;select SCOPE_IDENTITY()";
        $result = sqlsrv_query($conn, $query , array() , array("Scrollable" => "static")) or  die( print_r( sqlsrv_errors(), true)) ;
        sqlsrv_next_result($result);
        sqlsrv_fetch($result);
        $CourseID = sqlsrv_get_field($result , 0);
        $arr["CourseID"] = $CourseID;
        echo json_encode($arr);
        //echo " Insert operation Done...";

        break;

    case "Update":
        //echo "Performing Update operation...";
        // Add your code for Edit here
        $CourseID = $_REQUEST["CourseID"];
        $CourseName = $_REQUEST["CourseName"];
        $CourseDescription = $_REQUEST["CourseDescription"];
        $CoursePrice = $_REQUEST["CoursePrice"];
        $TrainerShareRate = $_REQUEST["TrainerShareRate"];
        $CreateDate = $_REQUEST["CreateDate"];
        $IsActive = $_REQUEST["IsActive"];
        $TrainerID = $_REQUEST["TrainerID"];
        $PortalID = $_REQUEST["PortalID"];
        $query = "update Course set CourseName= N'$CourseName', CourseDescription= N'$CourseDescription', CoursePrice= '$CoursePrice', 
                    TrainerShareRate= '$TrainerShareRate', CreateDate= '$CreateDate', IsActive= $IsActive, 
                    TrainerID= $TrainerID, PortalID = $PortalID 
                    where CourseID = $CourseID";
        sqlsrv_query($conn, $query , array() , array("Scrollable" => "static")) or  die( print_r( sqlsrv_errors(), true)) ;
        //echo " Update operation Done...";

        break;

    case "Delete":
        //echo "Performing Delete operation...";
        // Add your code for Delete here
        $CourseID = $_REQUEST["CourseID"];
        $query = "delete from Course where CourseID = $CourseID";
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