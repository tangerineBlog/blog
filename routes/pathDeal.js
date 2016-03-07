/**
 * Created by Ju-iz on 2016/2/16.
 */
var article = require('./../models/article.js');

var dealPath = function(req,res,Url){

    var getData = function(path){

        var fs = require('fs');
        return fs.readFileSync(path).toString();

    };
    var pathStart = '../myproject/views/';
    var pathname = Url.pathname;
    switch (pathname) {

        case '/':

            res.send(getData(pathStart + 'index.html'));
            break;
        case '/other':

            res.send(getData(pathStart + 'other.html'));
            break;
        case '/login':

            res.send(getData(pathStart + 'login.html'));
            break;
        case '/single':

            res.send(getData(pathStart + 'single.html'));
            break;
        case '/contact':

            res.send(getData(pathStart + 'contact.html'));
            break;
        case '/manage':

            res.send(getData(pathStart + 'manage.html'));
            break;
        case '/insert':

            res.send(getData(pathStart + 'insert.html'));
            break;
    }
};

exports.dealPath = dealPath;
