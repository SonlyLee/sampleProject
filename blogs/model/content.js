const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    author: String,
    views: {type:Number,default:0},
    time: {
        type: Date,
        default: Date.now
      },
    giveLike: {type:Number,default:0},
    comments:[{
        submitUserName: {type:String,default:'匿名'},   
        commentsContent: String,
        Date: {type:Date,default:Date.now},
        giveLikes: {type:Number,default:0},
        give: {type:Boolean,default: true},
        answer: {type:Boolean,default: false},
    }],
    category: String,
    content: String,
    url: String
})

const Article = mongoose.model('articles',articleSchema);
module.exports = Article;
