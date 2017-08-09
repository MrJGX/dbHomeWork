/**
 * Created by ASUS on 2017/7/15.
 */

$(document).ready(function () {

    //默认加载首页信息
    $.get("/home/homePage",function(data){

        $(".subHtml").html(data)
            .ready(function () {
                $("#navigation").height($("#homePageTable").height());//导航栏高度对其
            });
    });


    //颜色变化
    $(".subTitle").each(function (index, element) {
        $(element).mouseover(function () {
            $(element).css({"color":"#fd4047"});
        })
            .mouseout(function () {
                $(element).css({"color":"#525253"});
            })
    });






    //加载专家信息填入页面
    $("#fillInfo").click(function () {
        $.get("/home/fillInfo",function (data) {
            $(".subHtml").html(data)
                .ready(function () {
                    $("#navigation").height($("#subHtml").height());//导航栏高度对其

                    //设置属性值
                    $.post("/home/fillInfo/setInfo",
                        {username:localStorage.username},
                        function(data){

                            if(data.verify == false){
                                return;//还没有填入信息，选择返回
                            }

                            $("#expertID").val(data.expertID);
                            $("#state").val(data.state);
                            $("#validTime").val(data.validTime);
                            $("#name").val(data.name);
                            $("#gender").val(data.gender);
                            $("#birthday").val(data.birthday);
                            $("#politics").val(data.politics);
                            $("#picLocation").attr("src","/images/userPic/"+data.picLocation)
                                .attr("data-fileName",data.picLocation);
                            $("#workTitle").val(data.workTitle);
                            $("#workDuty").val(data.workDuty);
                            $("#workDuration").val(data.workDuration);
                            $("#ifRetire").val(data.ifRetire);
                            $("#ifPartTime").val(data.ifPartTime);
                            $("#workplace").val(data.workplace);
                            $("#speciality").val(data.speciality);
                            $("#performance").val(data.performance);
                            $("#other").val(data.other);
                            $("#Ctype").val(data.Ctype);
                            $("#issue").val(data.issue);
                            $("#CID").val(data.CID);
                            $("#address").val(data.address);
                            $("#zipCode").val(data.zipCode);
                            $("#email").val(data.email);
                            $("#mobilePhone").val(data.mobilePhone);
                            $("#homePhone").val(data.homePhone);
                            $("#educationBack").val(data.educationBack);
                            $("#degree").val(data.degree);
                            $("#EID").val(data.EID);
                            $("#schoolMajor").val(data.schoolMajor);
                            $("#reviewField").val(data.reviewField);


                            //资格证书及其编号
                            var qualify_num = eval(data.qualify_num);
                            for(var i = 0; i < qualify_num.length; i++){//创建新的资格证书
                                $("#addQualify").click();
                            }
                            for(i = 0; i < qualify_num.length; i++){//赋值
                                $(".qualifyInput:eq("+i+")").val(qualify_num[i].qualify);
                                $(".qualifyInput:eq("+(i+qualify_num.length)+")").val(qualify_num[i].num);
                            }

                            //评审经历
                            var result = eval(data.reviewExp);
                            var length = result.length;
                            for(i = 0; i < length; i++){//创建新的评审经历
                                $("#addReview").click();
                            }
                            for(i = 0; i < result.length; i++){//赋值
                                $(".reviewExp:eq("+i*4+")").val(result[i].reviewDate);
                                $(".reviewExp:eq("+(i*4+1)+")").val(result[i].reviewName);
                                $(".reviewExp:eq("+(i*4+2)+")").val(result[i].description);
                                $(".reviewExp:eq("+(i*4+3)+")").val(result[i].reviewType);
                            }


                            //工作经历
                            result = eval(data.workExp);
                            length = result.length;
                            for(var i = 0; i < length; i++){//创建新的工作经历
                                $("#addWork").click();
                            }
                            for(i = 0; i < result.length; i++){//赋值
                                $(".workExp:eq("+i*5+")").val(result[i].startDate);
                                $(".workExp:eq("+(i*5+1)+")").val(result[i].endDate);
                                $(".workExp:eq("+(i*5+2)+")").val(result[i].expPlace);
                                $(".workExp:eq("+(i*5+3)+")").val(result[i].expDuty);
                                $(".workExp:eq("+(i*5+4)+")").val(result[i].certifier);

                            }

                            //回避单位
                            result = eval(data.avoidPlace);
                            length = result.length;
                            for( i = 0; i < length; i++){//创建新的回避单位
                                $("#addAvoid").click();
                            }
                            for(i = 0; i < result.length; i++){//赋值
                                $(".avoidPlace:eq("+i*2+")").val(result[i].avoidName);
                                $(".avoidPlace:eq("+(i*2+1)+")").val(result[i].ifWorkplace);
                            }


                            //初始不可编辑
                            $(":input:not(.modifyButton button)").attr({"disabled":"disabled"}); //可修饰按钮必须可编辑

                        }
                    )
                 });
        })
    });

    //加载专家首页
    $("#homePage").click(function () {
        $.get("/home/homePage",function(data){

            $(".subHtml").html(data)
                .ready(function () {
                    $("#navigation").height($("#homePageTable").height());//导航栏高度对其
                });

        })
    });

    //加载专家密码修改页面
    $("#modify").click(function(){

        $.get("/home/modifyPassword",function(data){
            $(".subHtml").html(data)
                .ready(function () {
                    $("#navigation").height($("#subHtml").height());//导航栏高度对其
                });
        });
    });


});


