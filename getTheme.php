<?php
    // configuration
    $dbtype		= "InnoDB";
    $dbhost 	= "localhost";
    $dbport     = "8889";
    $dbname		= "random_generator";
    $dbuser		= "root";
    $dbpass		= "root";

    try{
        // database connection
        $conn = new PDO("mysql:host=$dbhost;port=$port;dbname=$dbname",$dbuser,$dbpass);

        // new data
        $settingcode = $_REQUEST['code'];

        // query
        $sql = "SELECT * FROM USER_SETTINGS WHERE settingcode = :code";
        $q = $conn->prepare($sql);
        $q->execute(array(':code'=>$settingcode));
        $result = $q->fetch();
        
        echo $result["settings"];
    } catch(Exception $e) {
        echo "Error";
    } catch(PDOException $e) {
        echo "Error";
    }
?>