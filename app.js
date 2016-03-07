var express = require('express');
var path = require('path');
var url = require('url');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dealPtah = require(__dirname + '/routes/pathDeal').dealPath;

var app = express();
var router = express.Router();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//管理员登录的验证\
app.use('/action',require(__dirname + '/routes/login'));

//对于不同路径页面请求的处理
app.use(function (req, res, next) {

    var Url = url.parse(req.url);

    dealPtah(req, res, Url);
    next();

});

//article数据请求的处理
app.use('/',require(__dirname + '/routes/articles'));

//留言数据的处理
app.use('/',require(__dirname + '/routes/messages'));


app.listen(3000);

module.exports = app;
