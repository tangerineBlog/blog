/**
 * Created by Ju-iz on 2016/2/18.
 */
var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var userSchema = new Schema({

    name:String,
    passwords:String

});

var user = mongodb.mongoose.model("users", userSchema);
var userDAO = function(){};

userDAO.prototype.login = function(userJson, callback) {
    user.findOne(userJson, function(err, obj){
        callback(err, obj);
    });
}

module.exports = new userDAO();