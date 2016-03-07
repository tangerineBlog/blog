var router = require('express').Router();
var user = require('./../models/user.js');

router.post('/', function (req, res) {

    var getData = function (path) {

        var fs = require('fs');
        return fs.readFileSync(path).toString();

    };
    var pathStart = '../myproject/views/';

    var query = {name: req.body.name, passwords: req.body.passwords};

    user.login(query, function (err, obj) {

        if(obj){
            res.setHeader("Set-Cookie", ['name=' + query.name,'passwords='+ query.passwords]);
            res.send(getData(pathStart + 'manage.html'));
        }else{
            res.send(getData(pathStart + 'fieldLogin.html'));
        }

    })

})

router.post('/match',function(req,res){

    var query = {name: req.body.name, passwords: req.body.passwords};

    user.login(query, function (err, obj) {

        if(obj){
            res.send('i am a tangerine');
        }
    })

})

module.exports = router;