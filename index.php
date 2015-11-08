<?php
    if(isset($_REQUEST['code']) && trim($_REQUEST['code']) != "") {
        include 'dbconn.php';

        // new data
        $settingcode = $_REQUEST['code'];

        // query
        $sql = "SELECT * FROM USER_SETTINGS WHERE settingcode = :code";
        $q = $conn->prepare($sql);
        $q->execute(array(':code'=>$settingcode));
        $result = $q->fetch();

        $preset = $result["settings"];
    }
?>

<!doctype html>
<html>
    <head>
        <title>랜덤 추첨기</title>
        
        <meta charset="utf-8" />
        <meta name="title" content="랜덤 추첨기" />
        <meta name="description" content="점심 내기를 할 때 효과가 좋습니다." />
        
        <link rel="image_src" href="images/thumbnail.png" />
        <link rel="stylesheet" href="css/main.css" />
        <link href='//cdn.rawgit.com/openhiun/hangul/14c0f6faa2941116bb53001d6a7dcd5e82300c3f/nanumbarungothic.css' rel='stylesheet' type='text/css' />
        
        <script type="text/javascript">
            <?php 
                if(isset($preset) && trim($preset) != "")
                    echo "preset = " . $preset;
                else
                    echo "preset = {'backgroundColor': '#13C276', 'color': '#FFFFFF', 'title': '이벤트 추첨', 'logo': '../image/logo.png'}";
            ?>
        </script>
        
        <script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
        <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
        <script type="text/javascript" src="js/main.js"></script>
    </head>
    <body>
        <div class="root" id="settingRoot">
            <div id="title" class="title applyColor applyBackgroundColor">이벤트 추첨</div>
            
            <div class="input applyBackgroundColor">
                <input id="inputBox" class="applyColor" type="text" placeholder="이름을 입력하고 Enter를 누르세요." />
            </div>
            
            <div class="container"></div>
            
            <div id="number_selector" class="number_selector applyColor applyBackgroundColor">
                <div onclick="decrease()">-</div>
                <div><input id="numbers" class="applyColor" type="text" value="1" /></div>
                <div>명</div>
                <div onclick="increase()">+</div>
            </div>
            
            <div id="btn_generate" class="title applyColor applyBackgroundColor">
                추첨하기
            </div>
            
            <div class="copyright"></div>
        </div>
        
        <div class="root" id="resultRoot" style="display: none;">
            <div class="title applyColor applyBackgroundColor">이벤트 추첨 결과</div>
            
            <div class="result container"></div>
            
            <div class="copyright"></div>
        </div>
        
        <div id="globalMenu" class="applyBackgroundColor applyColor">
            배경색 <input type="text" id="setBackgroundColor" class="small" />
            전경색 <input type="text" id="setColor" class="small" />
            추첨기 이름 <input type="text" id="setTitle" class="big" />
            <button>로고 설정</button><input type="file" id="setLogo" accept="image/*" />
            <button onclick="createNewTheme()">생성</button>
            <?php
            if(isset($_REQUEST['code']) && trim($_REQUEST['code']) != "") {
                echo "<span id='themeURL'>http://jeta.pe.hu/random?code=" . $_REQUEST['code'] . "</span>";
            } else {
                echo "<span id='themeURL'>http://jeta.pe.hu/random?code=00000000000000</span>";
            }
            ?>
        </div>
    </body>
</html>