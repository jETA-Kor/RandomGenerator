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
        $settingcode = date("YmdHis");
        $title = $_REQUEST['title'];
        $settings = $_REQUEST['settings'];

        // query
        $sql = "INSERT INTO USER_SETTINGS (settingcode, title, settings) VALUES (:code, :title, :settings)";
        $q = $conn->prepare($sql);
        $q->execute(array(':code'=>$settingcode,
                          ':title'=>$title,
                          ':settings'=>$settings));
        
        echo $settingcode;
    } catch(Exception $e) {
        echo "Error";
    } catch(PDOException $e) {
        echo "Error";
    }
?>