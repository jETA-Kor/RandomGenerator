<?php
    include 'dbconn.php';

    // new data
    $settingcode = $_REQUEST['code'];

    // query
    $sql = "SELECT * FROM USER_SETTINGS WHERE settingcode = :code";
    $q = $conn->prepare($sql);
    $q->execute(array(':code'=>$settingcode));
    $result = $q->fetch();

    echo $result["settings"];
?>