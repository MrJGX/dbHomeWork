/**
 * Created by ASUS on 2017/7/13.
 */
var express = require('express');
var connect = require('../models/DB_config');

var router = express.Router();


router.get('/',function(req,res){
    var role = req.query.roleSelect.toString();
    var password = req.query.password.toString();
    var username =  req.query.username.toString();
    var flag = false;//用户名密码验证
    var table;
    if(role == '管理员'){
        table = 'administrator';
    }
    else if(role == '用户'){
        table =  'userAccount';
    }
    var  sql = 'select username ' +
               ' from '+ table +
               ' where password = ? '+
               '       && username =  ? ';
    var sqlParam = [password,username];
    connect.query(sql,sqlParam,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        if(result.length > 0){
            flag = role;
        }
        res.send({verify:flag});
    });
});


// console.log('--------------------------SELECT----------------------------');
// console.log(result);
// console.log('------------------------------------------------------------\n\n');
// console.log(req.query.roleSelect);
// console.log(req.query.username);

module.exports = router;