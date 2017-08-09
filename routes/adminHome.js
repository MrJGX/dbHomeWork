
/**
 * Created by ASUS on 2017/8/7.
 */

var express = require("express");
var router = express.Router();
var connect = require("../models/DB_config");

router.get('/',function (req,res) {
   res.render("adminHome.html");
});

router.get('/amount',function (req,res) {

   var sql = " select count(*) as amount "+
             "  from userBase "+
             "  where state = '待审核' ";
   connect.query(sql,function (err,result) {
       if(err){
          console.log("[SELECT_ERROR]: "+ err.message);
       }

       if(result.length <= 0){
          res.send({amount:0});
       }
       else {
          res.send({amount:result[0].amount});
       }
   })

});

router.get("/query",function (req,res) {

   var reviewField = req.query.reviewField.toString();
   var state = req.query.state.toString();
   var sqlBase= " select distinct username,expertID,name,workplace,mobilePhone,inStoreType,state "+
        " from userAccount natural join userBase natural join contact natural join reviewField  ";
   var addSql = "";
   var param = [];

   if(reviewField == "" && state == ""){

   }
   else if(reviewField == ""){
       addSql = " where state = ? ";
       param = [state];
   }
   else if(state == ""){
       addSql = " where field = ? ";
       param = [reviewField];
   }
   else {
       addSql = " where state = ? and field = ? ";
       param = [state,reviewField];
   }

    connect.query(sqlBase+addSql,param,function (err,result) {
        if(err){
            console.log("[SELECT_ERROR]"+err.message);
        }
        res.send({queryRes:JSON.stringify(result)});
        res.end();
    })

});

router.post("/agree",function (req,res) {

    var username = req.body.username;


    var expertID ;
    var now = new Date();
    var nowDate = now.toLocaleDateString();
    var preID = nowDate.substr(0,4);//编号前缀
    var postID="";

    var findIDSql = "select expertID from userBase where username = ?";
    var findIDParam = [username];

    connect.query(findIDSql,findIDParam,function (err,result) {
        if(err){
            console.log("[SELECT_ERROR]"+err.message);
        }
        if(result[0].expertID != ""){
            expertID = result[0].expertID;
            postID = expertID.substr(4,8);
        }
    });

    //确定新的有效时间
    now = new Date();
    now.setFullYear(now.getFullYear() + 2);//两年有效期
    var validTime = now.toLocaleDateString();


    var countSql = " select postMaxID "+
                    " from giveExpertID "+
                    " where preID = ? ";
    var countParam = [preID];
    connect.query(countSql,countParam,function (err,result) {
        if(err){
            console.log("[SELECT_ERROR]"+err.message);
        }

        var sql = " update userBase "+
            " set state = '可用', "+
            " expertID = ?, " +
            " validTime = ?" +
            " where username = ?";

        //确定新的expertID
        if(result.length <= 0){
            expertID = preID+"0001";
            var insertSql = "insert into giveExpertID value(?,1)";
            var insertParam = [preID];
            modifyData(insertSql,insertParam);
        }
        else if(postID === ""){

            var newCount = result[0].postMaxID + 1;
            postID = newCount.toString();
            for(var i = 0; i < 4 - newCount.toString().length; i++){
                postID = '0'+postID;
            }
            expertID = preID+postID;

            var updateSql = " update giveExpertID "+
                             " set postMaxID = ? "+
                             " where preID = ?";
            var updateParam = [newCount,preID];
            modifyData(updateSql,updateParam);
        }

        var param = [expertID,validTime,username];

        connect.query(sql,param,function (err,result) {
            if(err){
                console.log("[SELECT_ERROR]"+err.message);
            }
            var json = {expertID:expertID,validTime:validTime};

            res.send(json);
            res.end();
        });

    })

});

router.post("/reject",function (req,res) {
    var username = req.body.username;

    var sql = " update userBase "+
        " set state = '已驳回' "+
        " where username = ?";
    var param = [username];

    connect.query(sql,param,function (err,result) {
        if(err){
            console.log("[SELECT_ERROR]"+err.message);
        }
        res.end();
    });

});

router.post("/end",function (req,res) {
    var username = req.body.username;

    var sql = " update userBase "+
        " set state = '已终止' "+
        " where username = ?";
    var param = [username];

    connect.query(sql,param,function (err,result) {
        if(err){
            console.log("[SELECT_ERROR]"+err.message);
        }
        res.end();
    });
});


function modifyData(sql,param){
    connect.query(sql,param,function(err,result){
        if(err){
            console.log('[SELECT ERROE] - ',err.message);
        }
    });
}

module.exports = router;