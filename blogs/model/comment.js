const mongoose = require('mongoose');
var commentsSchema = new mongoose.Schema({
    submitUserName: {type:String,default:'匿名'},   
    commentsContent: String,
    Date: {type:Date,default:Date.now},
    giveLikes: {type:Number,default:0},
    give: {type:Boolean,default: true}
});
var Comments = mongoose.model('Comments', commentsSchema);
module.exports = Comments;