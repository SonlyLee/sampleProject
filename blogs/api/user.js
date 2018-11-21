const Article = require('./../model/content.js')
const express = require('express');
const route = express.Router();

//获取所有的文章
route.get('/recommendedArticle',(req,res)=>{
    Article.find().sort({time:-1}).limit(6).then((info)=>{
        if(!!info){
            res.send({
                code: 1,
                message: '查找成功...',
                content: info
            })
        }else{
            res.send({
                code: 0,
                message: '查找失败...'
            })
        }
    })
})

//获取分类文章
route.post('/category',(req,res)=>{
    console.log({...req.body})
    let page = Number(req.body.page || 1);
    let limit = 10;
    let pages = 0;
    Article.count({category:req.body.category},function(err,count){
        if(err){
            console.log('error',err);
            return;
        }
        if(count>0){
            pages = Math.ceil(count/limit);
            page = Math.min(page,pages);
            page = Math.max(page,1);
            let skip = (page - 1)*limit;
            Article.find({category:req.body.category}).sort({time: -1}).limit(limit).skip(skip).then((contents)=>{
                if(!!contents){
                    res.send({
                        code: 0,
                        contents: contents,
                        count: count
                    })
                }
            })
        }else if(count === 0){
            res.send({
                code: 1,
                message: '没有相关数据',
            })
        }else{
            res.send({
                code:2,
                message: '查找失败'
            })
        }
    })
})

//查看文章
route.post('/view',(req,res)=>{
    Article.findOne({...req.body}).exec((err,info)=>{
        if(err){
            console.log('error',err);
            return;
        }
        if(!!info){
            res.send({
                code: 1,
                message: '查找成功...',
                content: info
            })
            Article.findOneAndUpdate({
                _id:req.body._id
            },{$inc:{views:1}},{upset:true,new:true},(err,result)=>{
                if (err) {
                    console.log('update err', err)
                    return
                }
            })
        }else{
            res.send({
                code: 0,
                message: '查找失败...'
            })
        }
    })
})

//提交评论
route.post('/comment',(req,res)=>{
    Article.find({_id:req.body._id}).then((info,err)=>{
        if(err){
            console.log('error',err);
            return;
        }
        if(!!info){
            Article.findByIdAndUpdate({
                _id: req.body._id,
            },{$push:{"comments":{"commentsContent":req.body.comments}}},{new:true,upset:true},(err,result)=>{
                if(err){
                    console.log('update err',err);
                    return;
                }
                if(!!result){
                    console.log(result)
                    res.send({
                        code: 1,
                        message: '评论成功...',
                        comments: result.comments
                    })
                }else{
                    res.send({
                        code: 0,
                        message: '评论失败...'
                    })
                }
            })
        }
    })
})

//文章点赞
route.post('/addHeart',(req,res)=>{
    console.log({...req.body});
    if(!req.body.bool){   //文章点赞数加一
        Article.findByIdAndUpdate(
            {
                "_id":req.body._id,
            },
            {$inc:{'giveLike':1}},
            (err, result) => {
                if (err) {
                    console.log(err)
                } 
                if(!!result) {
                    res.send({
                        code: 1,
                        message: '点赞成功'
                    })
                }
            }
        )
    }else{
        Article.findByIdAndUpdate(
            {
                "_id":req.body._id,
            },
            {$inc:{'giveLike':-1}},
            (err, result) => {
                if (err) {
                    console.log(err)
                } 
            }
        )
    }
})

//评论点赞
route.post('/giveLikes',(req,res)=>{
    console.log({...req.body});
    if(!req.body.give){   //点赞数加一
        Article.update(
            {
                "_id":req.body._id,
                comments:{$elemMatch:{"_id":req.body.commentId}}
            },
            {$inc:{'comments.$.giveLikes':1}},
            (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result)
                    res.send({
                        code: 1,
                        message: '点赞成功'
                    })
                }
            }
        )
    }else{
        Article.update(
            {
                "_id":req.body._id,
                comments:{$elemMatch:{"_id":req.body.commentId}}
            },
            {$inc:{'comments.$.giveLikes':-1}},
            (err, result) => {
                if (err) {
                    console.log(err)
                }
            }
        )
    }
})


module.exports = route;


