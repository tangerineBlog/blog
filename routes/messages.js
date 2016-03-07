/**
 * Created by Ju-iz on 2016/2/23.
 */
var router = require('express').Router();
var message = require('./../models/message.js');
var url = require('url');


//var obj = {
//
//    name:'apple',
//    email:'872287771',
//    phone:'1234567890',
//    content:'i am an apple...',
//    data:'2012-45-54',
//    type:'message'
//
//}

router.post('/contact/post',function(req,res){

    var obj = {

        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        content:req.body.content,
        data:req.body.data,
        type:req.body.type

    }

    message.save(obj,function(err){

        if(!err){

            res.send('success to leave message...')

        }

    })

})


//message.showMessage(function(err,obj){
//
//    console.log(obj);
//
//})

module.exports = router;