<?php
require_once("Connection.php");

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
        $query = "select * from Users where UserType = 'TR'";
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
        $UserID = $_REQUEST["UserID"];
        $query = "select * from Users where UserID = $UserID";
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
        $UserFirstName = $_REQUEST["UserFirstName"];
        $UserMiddleName = $_REQUEST["UserMiddleName"];
        $UserLastName = $_REQUEST["UserLastName"];
        $UserProfilePic = $_REQUEST["UserProfilePic"];
        $UserGender = $_REQUEST["UserGender"];
        $UserTelephone = $_REQUEST["UserTelephone"];
        $UserEmail = $_REQUEST["UserEmail"];
        $JoinDate = $_REQUEST["JoinDate"];
        $IsActive = $_REQUEST["IsActive"];
        $UserName = $_REQUEST["UserName"];
        $UserPassword = $_REQUEST["UserPassword"];
        $UserType = $_REQUEST["UserType"];
        $DateofBirth = $_REQUEST["DateofBirth"];
        $query = "insert into Users (UserFirstName , UserMiddleName , UserLastName , UserProfilePic , UserGender , UserTelephone , UserEmail , JoinDate , IsActive , UserName , UserPassword , UserType , DateofBirth) 
                    values (N'$UserFirstName', N'$UserMiddleName' , N'$UserLastName' , '$UserProfilePic' , '$UserGender' , N'$UserTelephone' , N'$UserEmail' , '$JoinDate' , $IsActive , N'$UserName' , N'$UserPassword' , '$UserType' , '$DateofBirth')
                    ;select SCOPE_IDENTITY()";
        $result = sqlsrv_query($conn, $query , array() , array("Scrollable" => "static")) or  die( print_r( sqlsrv_errors(), true)) ;
        sqlsrv_next_result($result);
        sqlsrv_fetch($result);
        $UserID = sqlsrv_get_field($result , 0);
        $arr["UserID"] = $UserID;
        echo json_encode($arr);
        //echo " Insert operation Done...";

        break;

    case "Update":
        //echo "Performing Update operation...";
        // Add your code for Edit here
        $UserID = $_REQUEST["UserID"];
        $UserFirstName = $_REQUEST["UserFirstName"];
        $UserMiddleName = $_REQUEST["UserMiddleName"];
        $UserLastName = $_REQUEST["UserLastName"];
        $UserProfilePic = $_REQUEST["UserProfilePic"];
        $UserGender = $_REQUEST["UserGender"];
        $UserTelephone = $_REQUEST["UserTelephone"];
        $UserEmail = $_REQUEST["UserEmail"];
        $JoinDate = $_REQUEST["JoinDate"];
        $IsActive = $_REQUEST["IsActive"];
        $UserName = $_REQUEST["UserName"];
        $UserPassword = $_REQUEST["UserPassword"];
        $UserType = $_REQUEST["UserType"];
        $DateofBirth = $_REQUEST["DateofBirth"];
        $query = "update Users set UserFirstName= N'$UserFirstName', UserMiddleName = N'$UserMiddleName', UserLastName= N'$UserLastName', 
                    UserProfilePic= '$UserProfilePic', UserGender= '$UserGender', UserTelephone= N'$UserTelephone', 
                    UserEmail= N'$UserEmail', JoinDate= '$JoinDate', IsActive = $IsActive ,  UserName = N'$UserName' , 
                    UserPassword = N'$UserPassword' , UserType = '$UserType' , DateofBirth = '$DateofBirth'
                    where UserID = $UserID";
        sqlsrv_query($conn, $query , array() , array("Scrollable" => "static")) or  die( print_r( sqlsrv_errors(), true)) ;
        $response = "Done";
        echo json_encode($response);
        //echo json_encode("Done");
        //echo " Update operation Done...";

        break;

    case "Delete":
        //echo "Performing Delete operation...";
        // Add your code for Delete here
        $UserID = $_REQUEST["UserID"];
        $query = "delete from Users where UserID = $UserID";
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