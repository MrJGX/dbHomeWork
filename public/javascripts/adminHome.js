/**
 * Created by ASUS on 2017/8/8.
 */


$(document).ready(function ($) {

    var username;

    //默认进入首页
    setTimeout(function () {
        $("#adminHomePage").click();
    },100);

    //颜色变化
    $(".subTitle").each(function (index, element) {
        $(element).mouseover(function () {
            $(element).css({"color":"#fd4047"});
        })
            .mouseout(function () {
                $(element).css({"color":"#525253"});
            })
    });

    //状态信息强调
    $("#state").css({"color":"#ff533a"});


    $("#adminHomePage").click(function () {

        $(".subHtml:not('#adminHomeDiv')").css("display","none");
        $("#adminHomeDiv").css("display","block");

        $.get("/adminHome/amount",
            function (data) {
                $("#amount").html("当前有"+data.amount+"个专家待审核");
            });

        $("#navigation").height($("#adminHomeDiv").height());//导航栏高度对其
    });


    $("#manage").click(function () {
        $(".subHtml:not('#manageDiv')").css("display","none");
        $("#manageDiv").css("display","block");

        $("#navigation").height($("#manageDiv").height());//导航栏高度对其
    });


    $("#detailInfo").click(function () {
        $(".subHtml:not('#detailInfoDiv')").css("display","none");
        $("#detailInfoDiv").css("display","block");

        $("#navigation").height($("#detailInfoDiv").height());//导航栏高度对其
    });

    //点击显示评审项目
    $("#queryButton").click(function () {
        $.get("/adminHome/query",
            {
                reviewField:$("#reviewQuery").val(),
                state:$("#stateQuery").val()
            },
        function (data) {
            var result = eval(data.queryRes);

            var length = result.length;

            //先删除上次查询的内容
            $(".queryR").remove();

            for(var i = 0; i < length ; i++){
                $("#queryTable").append(
                    "<tr class = 'queryR'>" +
                    "<td class = 'queryCol'></td>"+
                    "<td class = 'queryCol'></td>"+
                    "<td class = 'queryCol'></td>"+
                    "<td class = 'queryCol'></td>"+
                    "<td class = 'queryCol'></td>"+
                    "<td class = 'queryCol'></td>"+
                    "<td><button class = 'displayButton'>显示评审项目</button></td>"+
                    "</tr>"
                );
                $(".queryCol:eq("+(i*6)+")").html(result[i].expertID);
                $(".queryCol:eq("+(i*6+1)+")").html(result[i].name);
                $(".queryCol:eq("+(i*6+2)+")").html(result[i].workplace);
                $(".queryCol:eq("+(i*6+3)+")").html(result[i].mobilePhone);
                $(".queryCol:eq("+(i*6+4)+")").html(result[i].inStoreType);
                $(".queryCol:eq("+(i*6+5)+")").html(result[i].state);
                $(".displayButton:eq("+(i)+")").attr("data-username",result[i].username);

                //需要更新导航栏的高度
                $("#navigation").height($("#subHtml").height());//导航栏高度对其
            }

            //为显示评审项目设置事件
            $(".displayButton").click(function () {
               username = $(this).attr("data-username");
               $.post("/home/fillInfo/setInfo",
                   {
                       username:username
                   },
                   function (data) {
                       $("#detailInfo").click();//触发详细信息按钮
                       //设置数据
                       $("#expertID").html(data.expertID);
                       $("#state").html(data.state);
                       $("#validTime").html(data.validTime);
                       $("#name").html(data.name);
                       $("#gender").html(data.gender);
                       $("#birthday").html(data.birthday);
                       $("#politics").html(data.politics);
                       $("#picLocation").attr("src","/images/userPic/"+data.picLocation);
                       $("#workTitle").html(data.workTitle);
                       $("#workDuty").html(data.workDuty);
                       $("#workDuration").html(data.workDuration);
                       $("#ifRetire").html(data.ifRetire);
                       $("#ifPartTime").html(data.ifPartTime);
                       $("#workplace").html(data.workplace);
                       $("#speciality").html(data.speciality);
                       $("#performance").html(data.performance);
                       $("#other").html(data.other);
                       $("#Ctype").html(data.Ctype);
                       $("#issue").html(data.issue);
                       $("#CID").html(data.CID);
                       $("#address").html(data.address);
                       $("#zipCode").html(data.zipCode);
                       $("#email").html(data.email);
                       $("#mobilePhone").html(data.mobilePhone);
                       $("#homePhone").html(data.homePhone);
                       $("#educationBack").html(data.educationBack);
                       $("#degree").html(data.degree);
                       $("#EID").html(data.EID);
                       $("#schoolMajor").html(data.schoolMajor);
                       $("#reviewField").html(data.reviewField);


                       $(".addRow").remove();//删除上次的行

                       //资格证书及编号
                       var result= eval(data.qualify_num);
                       var length = result.length;

                       for(var i = 0; i < length; i++){//创建新的资格证书
                           $(".qualifyName").append("<tr class = 'addRow'><td class = 'qualifyInputName'></td></tr>");
                           $(".qualifyNum").append("<tr class = 'addRow'><td class = 'qualifyInputNum'></td></tr>");

                           $(".qualifyInputName:eq("+i+")").html(result[i].qualify);
                           $(".qualifyInputNum:eq("+i+")").html(result[i].num);
                       }

                       //评审经历
                       result = eval(data.reviewExp);
                       length = result.length;
                       for(i = 1; i <= length; i++){//创建新的评审经历(已经有一行)
                           $(".reviewTable").append(
                               "<tr class = 'addRow'>" +
                               "<td></td>"  +
                               "<td></td>" +
                               "<td></td>" +
                               "<td></td>" +
                               "</tr>"
                           );

                           $(".reviewTable td:eq("+i*4+")").html(result[i-1].reviewDate);
                           $(".reviewTable td:eq("+(i*4+1)+")").html(result[i-1].reviewName);
                           $(".reviewTable td:eq("+(i*4+2)+")").html(result[i-1].description);
                           $(".reviewTable td:eq("+(i*4+3)+")").html(result[i-1].reviewType);
                       }

                       //工作经历
                       result = eval(data.workExp);
                       length = result.length;
                       for( i = 1; i <= length; i++){//创建新的工作经历
                           $(".workTable").append(
                               "<tr class = 'addRow'>" +
                               "<td></td>" +
                               "<td></td>" +
                               "<td></td>" +
                               "<td></td>" +
                               "<td></td>" +
                               "</tr>"
                           );

                           $(".workTable td:eq("+i*5+")").html(result[i-1].startDate);
                           $(".workTable td:eq("+(i*5+1)+")").html(result[i-1].endDate);
                           $(".workTable td:eq("+(i*5+2)+")").html(result[i-1].expPlace);
                           $(".workTable td:eq("+(i*5+3)+")").html(result[i-1].expDuty);
                           $(".workTable td:eq("+(i*5+4)+")").html(result[i-1].certifier);
                       }

                       //回避单位
                       result = eval(data.avoidPlace);
                       length = result.length;
                       for( i = 1; i <= length; i++){//创建新的回避单位

                           $(".avoidTable").append(
                               "<tr class = 'addRow'>" +
                               "<td ></td>" +
                               "<td></td>" +
                               "</tr>"
                           );

                           $(".avoidTable td:eq("+i*2+")").html(result[i-1].avoidName);
                           $(".avoidTable td:eq("+(i*2+1)+")").html(result[i-1].ifWorkplace);
                       }

                       $("#detailInfoDiv").ready(function () {
                           $("#navigation").height($("#detailInfoDiv").height());
                       });


                   });

            });

        });
    });


    //同意申请
    $(".agree").click(function () {
        $.post("/adminHome/agree",
            {
                username:username
            },
        function (data) {
            alert(
                    "同意申请成功！" +
                    "证书编号：" +  data.expertID+
                     "有效时间：" + data.validTime
            );
            //更新
            $("#queryButton").click();
            $.post("/home/fillInfo/setInfo",
                {
                    username:username
                },
                function (data) {
                    $("#expertID").html(data.expertID);
                    $("#state").html(data.state);
                    $("#validTime").html(data.validTime);
                });
        });
    });

    //驳回申请
    $(".reject").click(function () {
        $.post("/adminHome/reject",
            {
                username:username
            },
        function (data) {
            alert("驳回申请成功！");
            //更新
            $("#queryButton").click();
            $.post("/home/fillInfo/setInfo",
                {
                    username:username
                },
                function (data) {
                    $("#expertID").html(data.expertID);
                    $("#state").html(data.state);
                    $("#validTime").html(data.validTime);
                });
        });
    });

    //终止资格
    $(".end").click(function () {

        $.post("/adminHome/end",
            {
                username:username
            },
        function (data) {
            alert("终止资格成功！");

            //更新
            $("#queryButton").click();
            $.post("/home/fillInfo/setInfo",
                {
                    username:username
                },
                function (data) {
                    $("#expertID").html(data.expertID);
                    $("#state").html(data.state);
                    $("#validTime").html(data.validTime);
                });
        });

    });

});
