/**
 * Created by ASUS on 2017/7/17.
 */
$(document).ready(function ($) {

   // 输入框效果
    $("input:not(button)").mouseover(function () {
        $(this).css({"border":"#6b91ff solid 1px"});
    })
        .mouseleave(function () {
            $(this).css({"border":"none"});
        });

    //状态信息强调
    $("#state").css({"color":"#ff533a"});


    //增加资格证书及编号
    $("#addQualify").click(function () {

        if($(".qualifyNum tr").length > 0){//元素存在
            $(".qualifyButton").append("<tr><td><button class = 'deleteQualify'>删除资格证书</button></td></tr>");
        }

        $(".qualifyName").append("<tr><td> <input type = 'text' class = 'qualifyInput'/></td></tr>");
        $(".qualifyNum ").append("<tr><td><input type = 'text' class = 'qualifyInput'/></td></tr>");

        $(".qualifyInput").css({"background":"#e7eae2"});

        //定义删除资格证书及编号的事件(仅对于新添加的删除按钮)
        $(".deleteQualify:last").click(function () {

            var index = $(this).index(".deleteQualify");


            if($(".deleteQualify:last").index(".deleteQualify") > 0){//至少还剩下两个删除按钮数,据会顺移至上...

                $(".qualifyButton tr:last").remove();//删除最后一个按钮就行，反正按钮事件触发时会自己对齐数据
            }
            else{//需要解除事件绑定，避免多个click事件的绑定，导致删除多组数据
                $(".deleteQualify").unbind("click");
            }

            $(".qualifyName tr:eq("+index+")").remove();//字符串识别+变量
            $(".qualifyNum tr:eq("+index+")").remove();

            $("#navigation").height($("#subHtml").height());//导航栏高度对其
        });


        //需要更新导航栏的高度
        $("#navigation").height($("#subHtml").height());//导航栏高度对其
    });



    //评审领域的按钮选择事件
    $(".review button").each(function (index, element) {
        $(this).click(function(){
           $(this).toggleClass("selectedReview");
           if($(this).hasClass("selectedReview")){
               $(this).css({"background":"#f1f4ec url('/images/UI/reviewChoose.png')","background-size":"16px 19px"});
           }
           else{
               $(this).css({"background":"#f1f4ec"});
           }
        });
    });

    //增加评审领域
    $("#selectReview").click(function () {
        //可视化及设置初始位置
        var initX = parseInt($(this).offset().left) - 450;
        var initY = parseInt($(this).offset().top) - 190;
        //alert(initX+"  "+initY);
        $("#subWindow").css({"display":"block","left":initX,"top":initY});
    });

    //关闭评审领域窗口
    $("#closeW").click(function () {
        $("#subWindow").css("display","none");

    });

    //确认评审领域窗口
    $("#confirmW").click(function () {
        var count = 0;
        var reviewStr = "";
        $(".review button").each(function (index, element) {
           if($(this).hasClass("selectedReview")){
               count++;
               reviewStr += $(this).val() + " ";
           }
        });

        if(count >= 3 || count <= 0){
            alert("评审领域最多选择两项,至少选择一项！");
        }
        else {
            $("#subWindow").css("display","none");
            $("#reviewField").val(reviewStr)};
    });

    //评审领域窗口可移动化
    enableDrag($("#subWindow"),$("#moveAble"));


    //增加评审经历
    $("#addReview").click(function () {
        $(".reviewTable").append(
            "<tr>" +
                 "<td><input type = 'date' class = 'reviewExp' /></td>"  +
                 "<td><input type = 'text' class = 'reviewExp' /></td>" +
                 "<td><input type = 'text' class = 'reviewExp' /></td>" +
                 "<td><select class = 'reviewExp'>" +
                        "<option>评估</option>" +
                        "<option>评审</option>" +
                     "</select></td>" +
                 "<td><button class = 'deleteReview'>删除经历</button></td>" +
            "</tr>"
        );
        $(".reviewExp:not(select)").css({"background":"#e7eae2"});

        //为删除按钮注册对应的事件
        $(".deleteReview:last").click(function () {
            var index = $(this).index(".deleteReview");
            $(".reviewTable tr:eq("+(index+1)+")").remove();
            //需要更新导航栏的高度
            $("#navigation").height($("#subHtml").height());//导航栏高度对其
        });

        //需要更新导航栏的高度
        $("#navigation").height($("#subHtml").height());//导航栏高度对其
    });


    //增加工作经历
    $("#addWork").click(function () {
        $(".workTable").append(
            "<tr>" +
                 "<td><input class = 'workExp' type = 'date'/></td>" +
                 "<td><input class = 'workExp' type = 'date'/></td>" +
                 "<td><input class = 'workExp' type = 'text'/></td>" +
                 "<td><input class = 'workExp' type = 'text'/></td>" +
                 "<td><input class = 'workExp' type = 'text'/></td>" +
                 "<td><button class = 'deleteWork'>删除</button></td>" +
            "</tr>"
        );
        $(".workExp").css({"width":"180px","background":"#e7eae2"});


        //为删除工作经历的事件
        $(".deleteWork:last").click(function () {

            var index = $(this).index(".deleteWork");
            $(".workTable tr:eq("+(index+1)+")").remove();

            //需要更新导航栏的高度
            $("#navigation").height($("#subHtml").height());//导航栏高度对其
        });


        //需要更新导航栏的高度
        $("#navigation").height($("#subHtml").height());//导航栏高度对其
    });


    //增加回避单位
    $("#addAvoid").click(function () {
        $(".avoidTable").append(
            "<tr>" +
                 "<td ><input type='text' class = 'avoidPlace' class = 'avoidInput'/></td>" +
                  "<td><select class = 'avoidPlace'>" +
                         "<option>是</option>" +
                         "<option>否</option>" +
                         "</select></td>" +
                 "<td><button class = 'deleteAvoid'>删除回避单位</button></td>" +
            "</tr>"
        );

        $(".avoidPlace:not(select)").css({"width":"480px","background":"#e7eae2"});

        //为删除回避单位对应的事件
        $(".deleteAvoid:last").click(function () {

            var index = $(this).index(".deleteAvoid");
            $(".avoidTable tr:eq("+(index+1)+")").remove();
            //需要更新导航栏的高度
            $("#navigation").height($("#subHtml").height());//导航栏高度对其
        });

        //需要更新导航栏的高度
        $("#navigation").height($("#subHtml").height());//导航栏高度对其
    });



    //一定时间后设置input初始不可编辑
    setTimeout(disenableEdit,100);

    //点击编辑可编辑
    $(".infoEditButton").click(function(){
        enableEdit();
        $(".star").remove();
        addStar();

        //对于待审核的用户只不允许修改必填的信息
        $.post("/home/getState",
            {
                username:localStorage.username
            },
            function (data) {
                if(data.verify == true){
                    $(".mustFill").attr("disabled","disabled");
                }
            }
        )
    });

    //保存到数据库
    $(".infoSaveButton").click(function(){


        //验证必填项
        var flag = true;

        $(".mustFill").each(function (index, element) {
           if(! verifyInput($(this))){
               flag = false;
           }
        });

        if(flag){

            $.post('/home/saveInfo',
                {
                    username:localStorage.username,
                    name:$("#name").val(),
                    gender:$("#gender").val(),
                    birthday: $("#birthday").val(),
                    politics:$("#politics").val(),
                    picLocation:$("#picLocation").attr("data-fileName"),
                    Ctype:$("#Ctype").val(),
                    issue:$("#issue").val(),
                    CID:$("#CID").val(),
                    educationBack:$("#educationBack").val(),
                    degree:$("#degree").val(),
                    workTitle:$("#workTitle").val(),
                    EID:$("#EID").val(),
                    workDuty:$("#workDuty").val(),
                    workDuration:$("#workDuration").val(),
                    ifRetire:$("#ifRetire").val(),
                    ifPartTime:$("#ifPartTime").val(),
                    workplace:$("#workplace").val(),
                    address:$("#address").val(),
                    zipCode:$("#zipCode").val(),
                    email:$("#email").val(),
                    mobilePhone:$("#mobilePhone").val(),
                    homePhone:$("#homePhone").val(),
                    schoolMajor:$("#schoolMajor").val(),
                    reviewField:$("#reviewField").val(),
                    qualify_num:JSON.stringify(getQualify_num()),
                    reviewExp:JSON.stringify(getReviewExp()),
                    workExp:JSON.stringify(getWorkExp()),
                    avoidPlace:JSON.stringify(getAvoidPlace()),

                    speciality:$("#speciality").val(),
                    performance:$("#performance").val(),
                    other:$("#other").val()

                },
                function(data,status){
                    if(status.toString() == "success"){

                        alert("保存成功！");
                    }
                }
            );
        }
        else {
            $(".mustFill").each(function (index, element) {
                if(! verifyInput($(this))){
                    flag = false;
                }
            });
            alert('存在必填项未填写！');
        }

    });

    //必填项的鼠标失去焦点事件
    $(".mustFill").blur(function () {
        verifyInput($(this));
    });

    //提交给管理员审核
    $(".infoSubmitButton").click(function(){
        $.post("/home/submit",
            {
                username:localStorage.username
            },
            function (data) {
                if(data.verify== true){
                    alert("提交成功！");
                    $("#fillInfo").click();//重新加载表格信息
                }
                else {
                    alert(data.verify);
                }
            }
        )
    });


    //上传照片
    $("#upLoadPic").change(function(){
        var formData = new FormData($("#fileForm")[0]);

        formData.append("username",localStorage.username);//用户名

        $.ajax({
            url:"/home/upLoadPic",
            type:"post",
            data:formData,
            processData:false,
            contentType:false,
            success:function (res) {
                if(res.verify == true){
                    $("#picLocation").attr("src","/images/userPic/"+res.fileName+
                                             "?"+ "n = " +Math.random() )//重新加载图片
                        .attr("data-fileName",res.fileName);//存储文件名;
                }
                else{
                    alert("照片格式只支持png或者jpg！");
                }
            },
            error:function (res) {
                alert("系统错误！");
            }
        })
    });

});


//必填选项
function addStar(){
    $(".mustFill").each(function (index, element) {
        $(element).after("<small class = 'star' style='color: #ff533a'>*</small>") ;
    });
}

//设置input初始不可编辑
function disenableEdit(){
    $(":input:not(.modifyButton button)").attr({"disabled":"disabled"}); //可修饰按钮必须可编辑
}

//设置input可编辑
function enableEdit(){
    $(":input:not(.modifyButton button,.disabled)").removeAttr("disabled");
    $("input:not(button,.disabled)").css({"background":"#e7eae2"});

    $("#reviewField").attr({"disabled":"disabled"});//评审领域的选择不可编辑

}

//基本信息保存前的验证是否输入正确
function verifyInput(object){

    var val = object.val();
    var id = object.attr("id");

    if(val == "" || val == null || val == undefined){
        $("#"+id + "+small").remove();
        $("#"+id).after("<small class = 'star' style='color: #ff533a'>*  必填！</small>");
        return false;
    }
    else{
        $("#"+id + "+small").remove();
        $("#"+id).after("<small class = 'star' style='color: #ff533a'>*</small>");
        return true;
    }

}

function enableDrag(obj,dragField){
    //窗口的移动实现
    var moveFlag = false;
    var dx,dy;//鼠标距离控件的相对位置

    //更新子窗口的位置
    dragField.mousedown(function (e) {
        moveFlag = true;
        dx = e.pageX - parseInt(obj.css("left"));//字符串转化为整数
        dy = e.pageY - parseInt(obj.css('top'));
    })
        .mousemove(function (e) {
            if(moveFlag){//移动鼠标时计算控件左上角的坐标
                var newX = e.pageX - dx;
                var newY = e.pageY - dy;
                obj.css({"left":newX,"top":newY});
            }

        })
        .mouseup(function () {
            moveFlag = false;
        });
}

function getQualify_num(){
    var qualify_num = [];
    var Amount = $(".qualifyInput").length;
    for(var i = 0; i < (Amount/2);i++){
        qualify_num[i] = {};
        qualify_num[i].qualify = $(".qualifyInput:eq("+(i)+")").val();
        qualify_num[i].num = $(".qualifyInput:eq("+(i+(Amount/2))+")").val();
    }
    return qualify_num;
}

function getReviewExp(){
    var result = [];
    var length = ($(".reviewExp").length)/4;
    for(var i = 0; i < length ;i++){
        result[i] = {};
        result[i].reviewDate = $(".reviewExp:eq("+(i*4)+")").val();
        result[i].reviewName = $(".reviewExp:eq("+(i*4+1)+")").val();
        result[i].description = $(".reviewExp:eq("+(i*4+2)+")").val();
        result[i].reviewType = $(".reviewExp:eq("+(i*4+3)+")").val();
    }

    return result;
}

function getWorkExp(){
    var result = [];
    var length = ($(".workExp").length)/5;
    for(var i = 0; i < length ;i++){
        result[i] = {};
        result[i].startDate = $(".workExp:eq("+(i*5)+")").val();
        result[i].endDate = $(".workExp:eq("+(i*5+1)+")").val();
        result[i].expPlace = $(".workExp:eq("+(i*5+2)+")").val();
        result[i].expDuty = $(".workExp:eq("+(i*5+3)+")").val();
        result[i].certifier = $(".workExp:eq("+(i*5+4)+")").val();
    }
    return result;
}

function getAvoidPlace(){
    var result = [];
    var length = ($(".avoidPlace").length)/2;
    for(var i = 0; i < length ;i++){
        result[i] = {};
        result[i].avoidName = $(".avoidPlace:eq("+(i*2)+")").val();
        result[i].ifWorkplace = $(".avoidPlace:eq("+(i*2+1)+")").val();
    }
    return result;
}