/**
 * Created by ASUS on 2017/7/19.
 */

var express = require("express");
var connect = require("../models/DB_config");

var router = express.Router();

router.get('/',function (req,res) {
    res.render("register.html");
});


router.get('/verify',function(req,res){

    var username =  req.query.username.toString();
    var flag = true;//用户名密码验证
    var table = 'userAccount';


    var  sql = 'select username ' +
               ' from '+ table +
               ' where username = ? ';

    var sqlParam = [username];

    connect.query(sql,sqlParam,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }

        if(result.length > 0){
            flag = false;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result); console.log(flag);
        console.log('------------------------------------------------------------\n\n');

        res.send({verify:flag});

    });
});


router.post("/succeed",function (req,res) {

    var username =  req.body.username.toString();
    var password = req.body.password.toString();

    var  sql = "insert into userAccount value(?,?,'注册');";//新建账号成功

    var sqlParam = [username,password];

    console.log("运行到这里！");

    connect.query(sql,sqlParam,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
        }
        res.end();
    });

});


module.exports = router;