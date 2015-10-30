<?php
    include 'dbconn.php';

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
?>