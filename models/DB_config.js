/**
 * Created by ASUS on 2017/7/13.
 */
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'expertSys_admin',
    password : '123456',
    database : 'expertSys'
});

connection.connect();

module.exports = connection;