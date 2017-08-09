/**
 * Created by ASUS on 2017/7/23.
 */

$(document).ready(function () {

    //失去焦点时对名字格式进行验证
    $('#registerName').blur(function () {
        verifyName($("#registerName").val());
    });


    //失去焦点时对密码格式进行验证
    $("#registerPassword").blur(function(){
        verifyPassword($("#registerPassword").val());
    });

    //失去焦点时对密码重复性进行验证
    $("#passwordConfirm").blur(function(){
        verifyRepeat($("#passwordConfirm").val());
    });

    //点击注册时对所有输入进行重新的验证
    $("#registerConfirm").click(function(){

        if( verifyName($("#registerName").val()) &&
            verifyPassword($("#registerPassword").val()) &&
            verifyRepeat($("#passwordConfirm").val())){//全部验证通过


            $.post('/register/succeed',
                {
                    username:$("#registerName").val(),
                    password:$("#passwordConfirm").val(),
                },
                function(data,status){

                    if(status.toString() == "success"){
                        alert("注册成功!");
                        location.href = '/login';//跳转到登陆界面
                    }
                }
            );

        }
    });


    $("#reset").click(function(){
       location.href = '/register';//刷新页面即重新加载
    });


});


function verifyName(name){

    var flag = false;

    $(".nameAlert").remove();//删去上次的提示

    if(name.length < 5 ){
        $("#registerName").after("<span class = 'nameAlert'>&nbsp;&nbsp;用户名长度太短！</span>");
    }
    else if( ! /^[a-zA-Z][^]*$/.test(name)){
        $("#registerName").after("<span  class = 'nameAlert'>&nbsp;&nbsp;用户名必须以字母开头！</span>");
    }
    else if(! /^[a-zA-Z]([a-zA-Z0-9]|[._]){4,19}$/.test(name) ){
        $("#registerName").after("<span  class = 'nameAlert'>&nbsp;&nbsp;用户名包含错误字符！</span>");
    }
    else if(!uniqueName(name)){
        $("#registerName").after("<span  class = 'nameAlert'>&nbsp;&nbsp;用户名已存在！</span>");
    }else {
        flag = true;
    }

    if(flag){
        $("#registerName").after("<img  class = 'nameAlert' src='/images/UI/correct.png'/>");//正确匹配
        $(".nameAlert").css({"width":"18px","height":"18px","position":"relative","left":"4px","top":"4px"});//样式
        return true;
    }
    else {
        $(".nameAlert").css({"font-size":"12px","color":"#ff2b42"});//样式
        return false;
    }
}

function verifyPassword(password){
    var flag = false;

    $(".passwordAlert").remove();//删去上次的提示

    if(password.length < 6 ){
        $("#registerPassword").after("<span class = 'passwordAlert'>&nbsp;&nbsp;密码长度太短！</span>");
    }
    else {
        flag = true;
    }

    if(flag){
        $("#registerPassword").after("<img  class = 'passwordAlert' src='/images/UI/correct.png'/>");//正确匹配
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

    if(repeat == ($("#registerPassword").val())){

        $("#passwordConfirm").after("<img  class = 'confirmAlert' src='/images/UI/correct.png'/>");//正确匹配
        $(".confirmAlert").css({"width":"18px","height":"18px","position":"relative","left":"4px","top":"4px"});//样式
        return true;
    }
    else {
        $("#passwordConfirm").after("<span class = 'confirmAlert'>&nbsp;&nbsp;两次输入的密码不同，请重新输入！</span>");
        $(".confirmAlert").css({"font-size":"12px","color":"#ff2b42"});//样式
        return false;
    }
}

function uniqueName(name){

    $.ajaxSetup({
        async:false
    });//同步设置

    var flag = false;

    $.get("/register/verify",
        {
            username: name,
        },
        function (data) {
            if(data.verify == true){
                flag = true;
            }
        });

    $.ajaxSetup({
        async:true
    });//异步设置

    return flag;
}