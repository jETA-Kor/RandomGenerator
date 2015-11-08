/** 초기화 **/
$(document).ready(function() {
    version = "20151108-001"; // 버전명
    names = new Array();
    
    $(".applyBackgroundColor").css("background-color", preset.backgroundColor);
    $(".applyColor").css("color", preset.color);
    $("#title").html(preset.title);
    $(".container").css("border", "1px " + preset.backgroundColor + " solid");
    $("#setBackgroundColor").val(preset.backgroundColor);
    $("#setColor").val(preset.color);
    $("#setTitle").val(preset.title);
    
    $("#setBackgroundColor").bind("keyup", changeBackgroundColor);
    $("#setBackgroundColor").bind("blur", changeBackgroundColor);
    $("#setColor").bind("keyup", changeColor);
    $("#setColor").bind("blur", changeColor);
    $("#setTitle").bind("keyup", changeTitle);
    $("#setTitle").bind("blur", changeTitle);
    $('#setLogo').change(changeLogo);
    
    if(localStorage.getItem('number') != null)
        $("#numbers").val(localStorage.getItem('number'));
    
    $("#inputBox").keypress(enter_request); // Enter 입력 이벤트 바인딩
    $("#btn_generate").click(generate); // 추첨하기 버튼 이벤트 바인딩
    $("#resultRoot .title").click(undo); // 결과 취소 바인딩
    $("#numbers").change(function() { localStorage.setItem("number", $("#numbers").val()); });
    
    $("#reseltRoot").hide(); // 결과 화면 숨기기
    
    $(".copyright").append(
        "랜덤 추첨기 " + version + "<br />" +
        "Copyright 2015~ <a href=\"mailto:jeta@jetalog.net?Subject=랜덤%20추첨기(" +
        version +
        ")%20문의\">JoonChul Kim</a>. " + 
        "All rights reserved."
    ); // Copyright 입력
    
    if(localStorage.getItem('names') != null && localStorage.getItem('names') != "[]") {
        if(confirm("기존 추첨 대상자 목록이 발견되었습니다.\n불러오시겠습니까?")) {
            names = JSON.parse(localStorage.getItem('names'));
            for(var i = 0; i < names.length; i++) {
                inputNewItem(names[i]);
            }
        } else {
            localStorage.removeItem('names');
        }
    }
});

/* 새 이름 입력하기 */
function inputNewItem(param) {
    var tmp = document.createElement('div');
    tmp.className = "item";
    tmp.setAttribute("data-name", param);
    tmp.innerHTML = param + '<img src="images/delete.png" />';
    
    // 삭제 버튼 제어
    tmp.addEventListener("mouseover", function() { $(this).children("img").show(); });
    tmp.addEventListener("mouseout", function() { $(this).children("img").hide(); });
    
    // 삭제 이벤트 바인딩
    var deleteImage = tmp.getElementsByTagName('img')[0];
    deleteImage.addEventListener("click", function() {
        console.log(names.indexOf($(this).parent().attr("data-name")));
        names.splice(names.indexOf($(this).parent().attr("data-name")), 1);
        localStorage.setItem('names', JSON.stringify(names));

        $(this).parent().remove();
    });
    
    $('#settingRoot .container').append(tmp);
}

/* Enter 이벤트 */
function enter_request(e) {
	var keycode = (e.keyCode ? e.keyCode : e.which);

	if (keycode == '13') {
        if($("#inputBox").val() == "")
            alert("이름을 입력해주세요.");
        else {
            names.push($('#inputBox').val());
            localStorage.setItem('names', JSON.stringify(names));
            
            inputNewItem($('#inputBox').val());
            $('#inputBox').val('');
        }
	}

	e.stopPropagation();
}

/* 추첨인 증가, 감소 */
function decrease() {
    var number = $("#numbers").val();
    
    $("#numbers").val(--number);
    if($("#numbers").val() < 1) $("#numbers").val("1");
    
    localStorage.setItem("number", number);
}

function increase() {
    var number = $("#numbers").val();
    
    $("#numbers").val(++number);
    
    localStorage.setItem("number", number);
}

/* 추첨하기 */
function generate() {
    var numbers = $('#numbers').val();
    var cnt_Names = $("#settingRoot .container > div").length; // 현재 담겨있는 이름 수
    
    if(numbers < 1) {
        alert('추첨할 사람이 없습니다.');
        $("#numbers").val("1");
        
        return false;
    }
    
    if(cnt_Names < numbers) {
        alert('추첨할 사람이 전체 대상보다 많습니다.');
        
        return false;
    }
    
    var currentIndex = 0;
    var result = new Array();
    while(currentIndex < numbers) {
        var rnd = Math.floor(Math.random() * cnt_Names) + 1;
        var duplication = false;
        
        // 중복 체크
        if(currentIndex > 0) {
            for(var i = 0; i < currentIndex; i++) {
                if(rnd == result[i]) {
                    duplication = true;
                    break;
                }
            }
        }
        
        // 중복되지 않았다면 결과로 인정
        if(!duplication) {
            result.push(rnd);
            currentIndex++;
        }
    }
    
    showResult(result);
}

/* 결과 출력 */
function showResult(resultData) {
    $(".result").css("background-image", "url(" + preset.logo + ")");
    
    $("#resultRoot .container").html("");
    
    for(var i = 0; i < resultData.length; i++) {
        $("#resultRoot .container").append(
            "<div>" + $('.container div:nth-child(' + resultData[i] + ')').html() + "</div>"
        )
    }
    
    $("#settingRoot").fadeOut(500, function() {
        $("#resultRoot").fadeIn(500);
    });
}

/* 결과 취소 */
function undo() {
    $("#resultRoot").hide();
    $("#settingRoot").show();
}

/* 테마 자동 변경 */
function changeBackgroundColor() {
    var regex = /^(#([\da-f]{1,2}){3})$/i;
    if(!regex.test($("#setBackgroundColor").val()))
        return false;
    
    preset.backgroundColor = $("#setBackgroundColor").val();
    
    $(".applyBackgroundColor").css("background-color", preset.backgroundColor);
    $(".container").css("border", "1px " + preset.backgroundColor + " solid");
}

function changeColor() {
    var regex = /^(#([\da-f]{1,2}){3})$/i;
    if(!regex.test($("#setColor").val()))
        return false;
    
    preset.color = $("#setColor").val();
    
    $(".applyColor").css("color", preset.color);
}

function changeTitle() {
    preset.title = $("#setTitle").val();
    
    $("#title").html($("#setTitle").val());
}

/* 로고 등록 */
function changeLogo() {
    if(typeof(changing) != 'undefined' && changing) {
        alert('로고 업로드 중입니다.\n잠시만 기다려 주세요.');
        return false;
    }
    
    var FR = new FileReader();
    FR.onload = function(e) {
        changing = true;

        $.ajax({
            url: "https://api.imgur.com/3/upload",
            beforeSend: function (xhr) {xhr.setRequestHeader("Authorization", "Client-ID c657826f3d6ab44");},
            type: "POST",
            data: {
                image: e.target.result.replace(/.*,/, '')
            },
            datatype: "json",
            success: function(response) {
                alert('새 로고가 업로드 되었습니다.');
                
                preset.logo = response.data.link;

                delete changing;
            },
            error: function(response) {
                if(confirm('새 로고를 업로드하지 못했습니다.\n개발자에게 항의하시겠습니까?')) {
                    location.href="mailto:jeta@jetalog.net?Subject=랜덤%20추첨기(" + version + ")%20에 이미지 업로드가 되지 않잖아요!";
                }

                delete changing;
            }
        });
    };
    FR.readAsDataURL( document.getElementById('setLogo').files[0] );
}

/* 테마 생성 */
function createNewTheme() {    
    preset.backgroundColor = $("#setBackgroundColor").val();
    preset.color = $("#setColor").val();
    preset.title = $("#setTitle").val();
    
    $.ajax({
        method: "POST",
        url: "newTheme.php",
        data: {
            title: preset.title,
            settings: JSON.stringify(preset)
        }
    }).done(function(themeID) {
        $("#themeURL").html("http://jeta.pe.hu/random?code=" + themeID);
    });
}