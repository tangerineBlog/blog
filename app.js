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

//����Ա��¼����֤\
app.use('/action',require(__dirname + '/routes/login'));

//���ڲ�ͬ·��ҳ������Ĵ���
app.use(function (req, res, next) {

    var Url = url.parse(req.url);

    dealPtah(req, res, Url);
    next();

});

//article��������Ĵ���
app.use('/',require(__dirname + '/routes/articles'));

//�������ݵĴ���
app.use('/',require(__dirname + '/routes/messages'));


app.listen(3000);

module.exports = app;
