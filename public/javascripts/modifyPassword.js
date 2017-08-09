/**
 * Created by ASUS on 2017/8/5.
 */
$(document).ready(function ($) {


    //失去焦点时对旧密码正确性进行验证

    $("#currentP").blur(function(){
        verifyPassword($("#currentP").val());
    });

    //失去焦点时对新密码格式进行验证
    $("#newP").blur(function(){
        verifyNewPassword($("#newP").val());
    });

    //失去焦点时对密码重复性进行验证
    $("#confirmP").blur(function(){
        verifyRepeat($("#confirmP").val());
    });

    //点击确认修改密码
    $("#confirmM").click(function(){


        if( verifyPassword($("#currentP").val()) &&
            verifyNewPassword($("#newP").val())&&
            verifyRepeat($("#confirmP").val())){//全部验证通过

            $.post('/home/modifySucceed',
                {
                    username: localStorage.username,
                    password: $("#newP").val()
                },
                function (data,status) {
                  if(status.toString() == 'success'){
                      alert("修改密码成功！");
                  }
                }
            )
        }
    });

    //点击重置修改密码窗口
    $("#cancelM").click(function () {
        $("#currentP").val("");
        $("#newP").val("");
        $("#confirmP").val("");
        $(".currentPAlert,.passwordAlert,.confirmAlert").remove();
    });

});


function verifyNewPassword(newPassword){
    var flag = false;

    $(".passwordAlert").remove();//删去上次的提示

    if(newPassword.length < 6 ){
        $("#newP").after("<span class = 'passwordAlert'>&nbsp;&nbsp;密码长度太短！</span>");
    }
    else {
        flag = true;
    }

    if(flag){
        $("#newP").after("<img  class = 'passwordAlert' src='/images/UI/correct.png'/>");//正确匹配
        $(".passwordAlert").css({"width":"18px","height":"18px","position":"relative","left":"4px","top":"4px"});//样式
        return true;
    }
    else {
        $(".passwordAlert").css({"font-size":"12px","color":"#ff2b42"});//样式
        return false;
    }
}

function verifyRepeat(repeat){

    $(".confirmAlert").remove();//删去上次的提示

    if(repeat == ($("#newP").val())){

        $("#confirmP").after("<img  class = 'confirmAlert' src='/images/UI/correct.png'/>");//正确匹配
        $(".confirmAlert").css({"width":"18px","height":"18px","position":"relative","left":"4px","top":"4px"});//样式
        return true;
    }
    else {
        $("#confirmP").after("<span class = 'confirmAlert'>&nbsp;&nbsp;输入的密码不同！</span>");
        $(".confirmAlert").css({"font-size":"12px","color":"#ff2b42"});//样式
        return false;
    }
}

function verifyPassword(password){

    $.ajaxSetup({
        async:false
    });//同步设置

    var flag = false;

    $.get(
        "/login_verify",
        {
            roleSelect:"用户",
            username:localStorage.username,
            password:password
        },
        function(data){
            flag = data.verify;
        }
    );

    $(".currentPAlert").remove();

    if(flag){
        $("#currentP").after("<img  class = 'currentPAlert' src='/images/UI/correct.png'/>");//正确匹配
        $(".currentPAlert").css({"width":"18px","height":"18px","position":"relative","left":"4px","top":"4px"});//样式
    }
    else{
        $("#currentP").after("<span class = 'currentPAlert'>&nbsp;&nbsp;密码不正确！</span>");
        $(".currentPAlert").css({"font-size":"12px","color":"#ff2b42"});//样式
    }


    $.ajaxSetup({
        async:true
    });//异步设置

    return flag;
}