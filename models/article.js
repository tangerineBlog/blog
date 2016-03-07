/**
 * Created by Ju-iz on 2016/2/18.
 */
var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var articleSchema = new Schema({

    title:String,
    author:String,
    content:String,
    data:String,
    type:String

});

var article = mongodb.mongoose.model("articles", articleSchema);
var articleDAO = function(){};

articleDAO.prototype.findByAuthor = function(name, callback) {
    article.find({author:name}, function(err, obj){
        callback(err, obj);
    });
}

articleDAO.prototype.findByType = function(type, callback) {
    article.find({type:type}, function(err, obj){
        callback(err, obj);
    });
}

articleDAO.prototype.findById = function(id, callback) {
    article.findOne({_id:id}, function(err, obj){
        callback(err, obj);
    });
}

articleDAO.prototype.findRegx = function(reGx,callback){

    article.find({title:new RegExp(reGx)},function(err,obj){

        if(obj.length){
            callback(err,obj);
        }else{
            article.find({content:new RegExp(reGx)},function(err,obj){
                callback(err,obj);
            })
        }

    })

}

articleDAO.prototype.save = function(obj, callback) {
    var instance = new article(obj);
    instance.save(function(err){
        callback(err);
    });
};

articleDAO.prototype.removeById = function(id, callback) {
    article.remove({_id:id}, function(err){
        callback(err);
    });
}

articleDAO.prototype.updateById = function(id,update,options,callback) {
    article.update({_id:id},update,options,function(err,docs){
        callback(err,docs);
    });
}

module.exports = new articleDAO();