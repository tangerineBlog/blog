/**
 * Created by Ju-iz on 2016/2/18.
 */
var router = require('express').Router();
var article = require('./../models/article.js');
var url = require('url');

var getTime = function(){

    var d = new Date();
    var year = d.getFullYear(),
        mouth = d.getMonth() + 1,
        data = d.getDate();

    var str = '';
    str = year + '-' + mouth + '-' + data;
    return str;

}

//获取博主所有的文章
router.post('/articles', function (req, res) {

    article.findByAuthor('tangerine',function (err, obj) {

        if(obj.length > 1) obj.reverse();

        res.send(obj);

    })

});

//获取推荐类型的文章
router.post('/articles/suggest', function (req, res) {

    article.findByType('suggest',function (err, obj) {

        if(obj){

            obj.reverse();

        }

        if(obj.length > 5){

            obj.length = 5;

        }

        res.send(obj);

    })

});

//查看时全文时通过id获取该文章
router.post('/single/articles',function(req,res){

    //console.log('the data to get is:' + req.body._id);
    var _id = req.body._id;
    article.findById(_id,function(err,obj){

        res.send(obj);

    })

})

//按照关键字搜索文章
router.post('/search',function(req,res){

    var qurey = req.body.key;

    article.findRegx(qurey,function(err,obj){

        if(!err){
            res.send(obj);
        }

    })

})

//管理员通过id增加文章
router.post('/insert/add',function(req,res){

    var obj = {

        "author":req.body.author,
        "content":req.body.content,
        "data": getTime(),
        "title": req.body.title,
        'type': req.body.type

    };

    article.save(obj,function(err){

        if(!err){

            res.send('success to save..');

        }else{

            res.send('filed to save..');

        }

    })

})

//管理员通过id删除文章
router.post('/manage/delete',function(req,res){

    var _id = req.body.id;

        article.removeById(_id,function(err){

            if(!err){
                res.send( _id + ' success to delete..')
            }

        })

})

//管理员通过_id修改文章
router.post('/manage/update',function(req,res){

    var obj = {};

    for(var attr in req.body){

        obj[attr] = req.body[attr];

    }

    var conditions = { author: 'tangerine' }
        , update = { $set: obj}
        , options = {};
  article.updateById(obj._id,update,options,function(err,docs){

     !err ? res.send('success to update..') : res.send('filed to update..')

  })


})

router.post('/manage/classify',function(req,res){

    var $type = req.body.type;
    article.findByType($type,function(err,obj){

        !err ? res.send(obj) : res.send('filed to get articles..')

    })

})

module.exports = router;