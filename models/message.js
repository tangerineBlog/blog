/**
 * Created by Ju-iz on 2016/2/23.
 */
var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var messageSchema = new Schema({

    name:String,
    email:String,
    phone:String,
    content:String,
    data:String,
    type:String

});

var message = mongodb.mongoose.model("messages", messageSchema);
var messageDAO = function(){};

messageDAO.prototype.save = function(obj, callback) {
    var instance = new message(obj);
    instance.save(function(err){
        callback(err);
    });
};

messageDAO.prototype.showMessage = function(callback) {
    message.find({type:'message'}, function(err, obj){
        callback(err, obj);
    });
}

module.exports = new messageDAO();