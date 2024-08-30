<?php
require('localConnection.php') ;  
?>

<?php 
		
	$status =  $_REQUEST["status"];
	
	if ($status == "one" )
	{
		$id = $_REQUEST["id"];
		$query = "select * from RT_CoursePortal where CoursePortalID=$id"   ;
		$result= sqlsrv_query($conn, $query , array() , array("Scrollable" => "static")) or  die( print_r( sqlsrv_errors(), true)) ;
			
		$arr = array();
		
		while ($row =  sqlsrv_fetch_Object($result))
		{
			$arr[] = $row;
		}
		echo json_encode($arr);
		return;
	}
	
	if ($status == "data" )
	{
		$query = "select * from RT_CoursePortal " ;
		$result= sqlsrv_query($conn, $query , array() , array("Scrollable" => "static")) or  die( print_r( sqlsrv_errors(), true)) ;
			
		$arr = array();
		
		while ($row =  sqlsrv_fetch_Object($result))
		{
			$arr[] = $row;
		}
		$response["data"] = $arr ;
		echo json_encode($response);
		return;
	}

	if ($status == "select" )
		{
			$query = "select * from RT_CoursePortal " ;
			$result=  sqlsrv_query($conn, $query , array() , array("Scrollable" => "static")) or  die( print_r( sqlsrv_errors(), true)) ; 
				
			$arr = array();
			
			while ($row = sqlsrv_fetch_Object($result))
			{
				$arr[] = $row;
			}
			echo json_encode($arr);
			return;
		}

	if($status=="delete") 
		{
			$id = $_REQUEST["id"];
			$query = "delete from RT_CoursePortal where CoursePortalID=$id" ;
			$result= sqlsrv_query($conn, $query , array() , array("Scrollable" => "static")) or  die( print_r( sqlsrv_errors(), true)) ;  
			echo json_encode("Record has been deleted.");
			return ; 
		}
	
	$CoursePortalName= addslashes($_REQUEST["CoursePortalName"]);
	$isActive= addslashes($_REQUEST["isActive"]);

	if ($status == "new")
	{
		$query = "insert into RT_CoursePortal  (CoursePortalName,isActive)  values (N'$CoursePortalName','$isActive');select SCOPE_IDENTITY()";
		$result = sqlsrv_query($conn, $query , array() , array("Scrollable" => "static")) or  die( print_r( sqlsrv_errors(), true)) ; 
		sqlsrv_next_result($result);
		sqlsrv_fetch($result);
        $id = sqlsrv_get_field($result , 0);
        $arr['CoursePortalID'] = $id;
        $arr['CoursePortalName'] = $CoursePortalName;
        $arr['isActive'] = $isActive;
        echo json_encode($arr);
        return;
	
	} 

	if ($status == "update")
	{ 
		$result = "";
		$id = $_REQUEST["id"];
		$query = "update RT_CoursePortal set CoursePortalName= N'$CoursePortalName', isActive='$isActive' where CoursePortalID = $id";
		sqlsrv_query($conn, $query , array() , array("Scrollable" => "static")) or  die( print_r( sqlsrv_errors(), true)) ; 
		echo json_encode($result);
	}
?>