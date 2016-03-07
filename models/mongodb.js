/**
 * Created by Ju-iz on 2016/2/18.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydata');
exports.mongoose = mongoose;