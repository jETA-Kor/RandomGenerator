/** 초기화 **/
$(document).ready(function() {
    version = "20150215-004"; // 버전명
    
    $("#inputBox").keypress(enter_request); // Enter 입력 이벤트 바인딩
    $("#btn_generate").click(generate); // 추첨하기 버튼 이벤트 바인딩
    
    $("#reseltRoot").hide(); // 결과 화면 숨기기
    
    $(".copyright").append(
        "랜덤 추첨기 " + version + "<br />" +
        "Copyright 2015~ <a href=\"mailto:jeta@jetalog.net?Subject=랜덤%20추첨기(" +
        version +
        ")%20문의\">JoonChul Kim</a>." + 
        "All rights reserved."
    ); // Copyright 입력
});

/* 새 이름 입력하기 */
function inputNewItem() {
    $('#settingRoot .container').append(
        '<div class="item">' + $('#inputBox').val() + '<img src="images/delete.png" />' + '</div>' + '\n'
    );
    
    $('#inputBox').val('');
    
    $("#settingRoot .container div").hover(
        function() {
            $(this).children("img").show();
        },
        function() {
            $(this).children("img").hide();
        }
    ); // 삭제 버튼 제어
    
    $("#settingRoot .container div img").click(
        function() {
            $(this).parent().remove();
        }
    ); // 삭제 이벤트 바인딩
}

/* Enter 이벤트 */
function enter_request(e) {
	var keycode = (e.keyCode ? e.keyCode : e.which);

	if (keycode == '13') {
        if($("#inputBox").val() == "")
            alert("이름을 입력해주세요.");
        else
            inputNewItem();
	}

	e.stopPropagation();
}

/* 추첨인 증가, 감소 */
function decrease() {
    var number = $("#numbers").val();
    
    $("#numbers").val(--number);
}

function increase() {
    var number = $("#numbers").val();
    
    $("#numbers").val(++number);
}

/* 추첨하기 */
function generate() {
    var numbers = $('#numbers').val();
    var cnt_Names = $("#settingRoot .container > div").length; // 현재 담겨있는 이름 수
    
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
    $("#resultRoot container").html("");
    
    for(var i = 0; i < resultData.length; i++) {
        $("#resultRoot .container").append(
            "<div>" + $('.container div:nth-child(' + resultData[i] + ')').html() + "</div>"
        )
    }
    
    $("#settingRoot").fadeOut(500, function() {
        $("#resultRoot").fadeIn(500);
    });
}