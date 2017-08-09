-// /**
//  * Created by ASUS on 2017/7/13.
$(document).ready(function(){
    $("#loginButton").click( function() {
        $.get("/login_verify",
            {
                roleSelect: $('#roleSelect').val(),
                username: $("#name").val(),
                password: $("#password").val()
            },
            function (data) {
                if(data.verify == '用户'){
                    location.href = '/home';//加载首页
                    localStorage.username = $("#name").val();//存储用户名
                }
                else if(data.verify == '管理员'){
                    location.href = '/adminHome';//加载管理员首页
                }
                else {
                    alert("角色，用户名或者密码不正确!");
                }
            });
    });

    //加载注册页面
    $("#registerButton").click(function () {
        location.href = '/register';
    });
});


