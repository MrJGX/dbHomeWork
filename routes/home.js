/**
 * Created by ASUS on 2017/7/14.
 */
var express = require('express');
var connect = require('../models/DB_config');
var fs = require("fs");

var router = express.Router();


router.get('/',function(req,res){
    res.render('home.html');
    res.end();
});



router.get('/fillInfo',function (req,res) {
   res.render('fillInfo.html');
    res.end();
})
    .get('/homePage',function (req,res) {

       res.render('homePage.html');
       res.end();

    })
    .get('/modifyPassword',function (req,res) {
       res.render('modifyPassword.html') ;
        res.end();
    });


router.post("/submit",function(req,res){

    var username = req.body.username;

    var sql = " select state " +
              " from userBase " +
              " where username = ?;";
    var param = [username];
    connect.query(sql,param,function (err,result) {
        if(err){
            console.log('[SELECT ERROE] - ',err.message);
            return;
        }


        if(result.length <= 0){
            res.send({verify:"请先填写并保存基本信息！"});
        }
        else {
            var state = result[0].state;
            switch (state){
                case '可用':
                case '填写中':
                case '待审核':
                case '失效':
                case '已驳回':
                    var stateSql = " update userBase "+
                                    " set state = '待审核' "+
                                    " where username = ?;";
                    modifyData(stateSql,param);
                    res.send({verify:true});
                    break;
                case '已终止':
                    res.send({verify:"已经失去资格，无法提交！"});
                    break;
            }
        }
    })
});

router.post("/getState",function(req,res){

    var username = req.body.username;

    var sql = " select state "+
            " from userBase "+
            " where username = ?;";
    var param = [username];
    connect.query(sql,param,function (err,result) {
       if(err){
           console.log("[SELECT_ERROR] "+ err.message);
       }

       if(result.length < 0 ){
           res.send({verify:false});
       }
       else if(result[0].state != '待审核'){
           res.send({verify:false});
       }
       else {
           res.send({verify:true});
       }
    });
});

router.post("/modifySucceed",function(req,res){

    var username = req.body.username;
    var password = req.body.password;

    var sql =  " update userAccount "+
               "  set password = ? "+
               "  where username = ?";
    var sqlParam = [password,username];

    modifyData(sql,sqlParam);
    res.end();
});


router.post("/saveInfo",function (req,res) {

    //收到的数据
    var username = req.body.username.toString();
    var name = req.body.name.toString();
    var gender = req.body.gender.toString();
    var birthday = req.body.birthday;
    var politics = req.body.politics;
    var picLocation = req.body.picLocation;
    var  workTitle = req.body.workTitle;
    var  workDuty = req.body.workDuty;
    var  workDuration = req.body.workDuration;
    var  ifRetire = req.body.ifRetire;
    var  ifPartTime = req.body.ifPartTime;
    var  workplace = req.body.workplace;
    var speciality = req.body.speciality;
    var performance = req.body.performance;
    var other = req.body.other;



    var  address = req.body.address;
    var  zipCode = req.body.zipCode;
    var  email = req.body.email;
    var  mobilePhone = req.body.mobilePhone;
    var  homePhone = req.body.homePhone;


    var Ctype = req.body.Ctype;
    var issue = req.body.issue;
    var CID = req.body.CID;


    var educationBack = req.body.educationBack;
    var  degree = req.body.degree;
    var  EID = req.body.EID;
    var  schoolMajor = req.body.schoolMajor;


    var  reviewField = req.body.reviewField.toString().split(" ");//按空格分割;

    var qualify_num =  eval(req.body.qualify_num);//资格证书及其编号
    var reviewExp = eval(req.body.reviewExp);
    var workExp = eval(req.body.workExp);
    var avoidPlace = eval(req.body.avoidPlace);


    var verifySql = " select username "+
                    "  from userBase "+
                    "  where username = ?";
    var verifySqlParam = [username];

    connect.query(verifySql,verifySqlParam,function (err,result) {
       if(err){
           console.log('[SELECT ERROE] - ',err.message);
           return ;
       }

       var userBaseSql;
       var userBaseParam;

       if(result.length > 0){//已经有数据，只需要修改userBase
            userBaseSql = " update userBase "+
                               " set name = ?  ,"+
                               "     gender = ?,"+
                               "     birthday = ?,"+
                               "     politics = ?,"+
                               "     picLocation = ?,"+
                               "     workTitle = ?,"+
                               "     workDuty = ?,"+
                               "     workDuration = ?,"+
                               "     ifRetire = ?,"+
                               "     ifPartTime = ?,"+
                               "     workplace = ?,"+
                               "     speciality = ?,"+
                               "     performance = ?,"+
                               "     other = ?"+
                               "     where username = ?;";
           userBaseParam = [name,gender,birthday,politics,picLocation,workTitle,
                                 workDuty,workDuration,ifRetire,ifPartTime,workplace,
                                 speciality,performance,other,username];

       }
       else {//还没有数据，需要重新输入userBase
            userBaseSql = "insert into userBase value(?,null,'填写中',null," +
                      "?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            userBaseParam = [username,name,gender,birthday,politics,picLocation,workTitle,
                                workDuty,workDuration,ifRetire,ifPartTime,workplace,
                                speciality,performance,other];
       }


       //先删除账号其他表的数据再插入
        var deleteSql =  "";
        var tableName = ['avoidPlace','certificate','contact','education','qualify_num','reviewExp',
                          'reviewField','workExp'];
        var deleteParam = [username];
        for(var j = 0; j < 8; j++){
            deleteSql = " delete from  "+ tableName[j]+
                        " where username =  ?;";
            modifyData(deleteSql,deleteParam);//删除原有的一些表数据
        }



        var contactSql = "insert into contact value(?,?,?,?,?,?);";
        var contactParam = [username,address,zipCode,email,mobilePhone,homePhone];

        var certificateSql = "insert into certificate value(?,?,?,?);";
        var certificateParam = [username,Ctype,issue,CID];

        var educationSql = "insert into education value(?,?,?,?,?);";
        var educationParam = [username,educationBack,degree,EID,schoolMajor];


        modifyData(userBaseSql,userBaseParam);//插入表userBase的数据
        modifyData(contactSql,contactParam);//插入表contact的数据
        modifyData(certificateSql,certificateParam);//插入表certificate的数据
        modifyData(educationSql,educationParam);//插入表education的数据

        //插入评审领域
        var reviewFieldSql = "insert into reviewField value(?,?);";
        for(var i = 0;i < reviewField.length - 1;i++){
            var reviewFieldParam = [username,reviewField[i]];
            modifyData(reviewFieldSql,reviewFieldParam);
        }



        //插入资格证书及其编号
        var qualify_numSql = "insert into qualify_num value(?,?,?);";
        for( i = 0;i < qualify_num.length;i++){
            var qualify_numParam = [username,qualify_num[i].qualify,qualify_num[i].num];
            modifyData(qualify_numSql,qualify_numParam);
        }

        //插入评审经历
        var reviewExpSql = "insert into reviewExp value(?,?,?,?,?);";
        for( i = 0;i < reviewExp.length;i++){
            var reviewExpParam = [username,reviewExp[i].reviewDate,
                                            reviewExp[i].reviewName,
                                            reviewExp[i].description,
                                            reviewExp[i].reviewType];
            modifyData(reviewExpSql,reviewExpParam);
        }

        //插入工作经历
        var workExpSql = "insert into workExp value(?,?,?,?,?,?);";
        for( i = 0;i < workExp.length;i++){
            var workExpParam = [username,workExp[i].startDate,
                                          workExp[i].endDate,
                                          workExp[i].expPlace,
                                          workExp[i].expDuty,
                                          workExp[i].certifier];

            modifyData(workExpSql,workExpParam);
        }

        //插入回避单位
        var avoidPlaceSql = "insert into avoidPlace value(?,?,?);";
        for( i = 0;i < avoidPlace.length;i++){
            var avoidPlaceParam = [username,avoidPlace[i].avoidName,
                                            avoidPlace[i].ifWorkplace];
                modifyData(avoidPlaceSql,avoidPlaceParam);
        }


        res.end();//防止浏览器请求挂起状态...
    });
});

router.post('/fillInfo/setInfo',function (req,res) {

    var username = req.body.username;
    var json = {};//待加入属性

    var baseSql = " select * " +
                  " from userBase natural join certificate natural join contact natural join education"+
                  " where username = ?;";
    var baseParam = [username];



    connect.query(baseSql,baseParam,function(err,result){
        if(err){
            console.log('[SELECT ERROE] - ',err.message);
            return ;
        }

        if(result.length <= 0){//还没有信息
            json.verify = false;
            res.send(json);
            return;
        }

        json.expertID = result[0].expertID;
        json.state = result[0].state;
        json.validTime = result[0].validTime;
        json.name = result[0].name;
        json.gender = result[0].gender;
        json.birthday = result[0].birthday;
        json.politics = result[0].politics;
        json.picLocation = result[0].picLocation;
        json.workTitle = result[0].workTitle;
        json.workDuty = result[0].workDuty;
        json.workDuration = result[0].workDuration;
        json.ifRetire = result[0].ifRetire;
        json.ifPartTime = result[0].ifPartTime;
        json.workplace = result[0].workplace;
        json.speciality = result[0].speciality;
        json.performance = result[0].performance;
        json.other = result[0].other;
        json.Ctype = result[0].Ctype;
        json.issue = result[0].issue;
        json.CID = result[0].CID;
        json.address = result[0].address;
        json.zipCode = result[0].zipCode;
        json.email = result[0].email;
        json.mobilePhone = result[0].mobilePhone;
        json.homePhone = result[0].homePhone;
        json.educationBack = result[0].educationBack;
        json.degree = result[0].degree;
        json.EID = result[0].EID;
        json.schoolMajor = result[0].schoolMajor;


        //判断证书日期是否失效
        var now = new Date();
        var nowDate = now.toLocaleDateString();
        if(json.validTime != "" && json.state === '可用' && nowDate > json.validTime){

            var updateSql = " update userBase "+
                             " set state = '失效' "+
                             " where username = ?";
            var updateParam = [username];
            modifyData(updateSql,updateParam);

            json.state = '失效';
        }

    });

    //评审领域
    var reviewSql = " select * " +
                     " from reviewField "+
                     "  where username = ?";
    var reviewFiled = "";
    connect.query(reviewSql,baseParam,function(err,result){
        if(err){
            console.log('[SELECT ERROE] - ',err.message);
            return ;
        }

        if(json.verify == false){
            return;//没数据
        }

        var reviewField = "";//待整合的评审领域

        for(var i = 0; i < result.length; i++){
            reviewField += (result[i].field + " ");
        }
        json.reviewField = reviewField;

    });


    //资格证书及其编号
    var qualify_numSql = " select qualify,num " +
        " from qualify_num "+
        "  where username = ?";
    connect.query(qualify_numSql,baseParam,function (err,result) {
        if(err){
            console.log('[SELECT ERROE] - ',err.message);
            return ;
        }
        if(json.verify == false){
            return;//没数据
        }
        json.qualify_num = JSON.stringify(result);
    });

    //评审经历
    var reviewExpSql = " select reviewDate,reviewName,description,reviewType " +
        " from reviewExp "+
        "  where username = ?";
    connect.query(reviewExpSql,baseParam,function (err,result) {
        if(err){
            console.log('[SELECT ERROE] - ',err.message);
            return ;
        }
        if(json.verify == false){
            return;//没数据
        }
        json.reviewExp = JSON.stringify(result);
    });

    //工作经历
    var workExpSql = " select startDate,endDate,expPlace,expDuty,certifier " +
        " from workExp "+
        "  where username = ?";
    connect.query(workExpSql,baseParam,function (err,result) {
        if(err){
            console.log('[SELECT ERROE] - ',err.message);
            return ;
        }
        if(json.verify == false){
            return;//没数据
        }
        json.workExp = JSON.stringify(result);
    });

    //回避单位
    var avoidPlaceSql = " select avoidName,ifWorkplace " +
        " from avoidPlace "+
        "  where username = ?";
    connect.query(avoidPlaceSql,baseParam,function (err,result) {
        if(err){
            console.log('[SELECT ERROE] - ',err.message);
            return ;
        }
        if(json.verify == false){
            return;//没数据
        }
        json.avoidPlace = JSON.stringify(result);



        res.send(json);
        res.end();//防止浏览器一直挂起
    });

});


router.post('/upLoadPic',function (req,res) {

    var username = req.body.username;//以用户名作为照片名

    var extName = "";//照片类型
    switch (req.files[0].mimetype){
        case 'image/pjpeg':
            extName = 'jpg';
            break;
        case 'image/jpeg':
            extName = 'jpg';
            break;
        case 'image/png':
            extName = 'png';
            break;
        case 'image/x-png':
            extName = 'png';
            break;
    }

    if(extName == ""){
        res.send({verify:"false"});
    }
    else{//只支持png或jpg格式
        var desFile =  __dirname + "/../public/images/userPic/"+
                       username + "." + extName;
        fs.readFile(req.files[0].path,function (err,data) {

            if(err){
                console.log(err);
            }

            fs.writeFile(desFile,data,function (err) {
                if(err){
                    console.log(err);
                    res.send({verify:false});
                }
                else {

                    var fileName = username + "." + extName;
                    res.send({verify:true,fileName:fileName});
                }
            })

        })
    }
});


function modifyData(sql,param){
    connect.query(sql,param,function(err,result){
        if(err){
            console.log('[SELECT ERROE] - ',err.message);
        }
    });
}


module.exports = router;