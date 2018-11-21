const Article = require('./../model/content.js')
const express = require('express');
const route = express.Router();
const multiparty = require('connect-multiparty');
var multipartMiddleware = multiparty();
var moment = require('moment');
var multer = require("multer");
var path = require('path');
var fs = require('fs');

//获取所有的文章
route.post('/home',(req,res)=>{
    let page = Number(req.body.page || 1);
    let limit = 10;
    let pages = 0;
    Article.count({},function(err,count){
        pages = Math.ceil(count/limit);
        page = Math.min(page,pages);
        page = Math.max(page,1);
        let skip = (page - 1)*limit;
        Article.find().sort({time: -1}).limit(limit).skip(skip).then((contents)=>{
            if(!!contents){
                res.send({
                    code: 0,
                    contents: contents,
                    count: count
                })
            }
        })
    })
})

//获取分类文章
route.post('/category',(req,res)=>{
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

//日期排序
route.get('/date',(req,res)=>{
    Article.find().sort({time:-1}).then(function(article){
        if(!!article){
            console.log(article)
            res.send({
                code:0,
                content:article
            })
        }
    })
})

//发表文章
route.post('/publish', (req, res) => {
    Article.findOne({ title: req.body.title }, (err, info) => {
        if (err) {
            console.log('error', err)
        }
        if (!!info) {
            res.send({
                code: 0,
                message: '标题重复，请输入合适的标题!'
            })
        } else {
            res.send({
                code: 1,
                message: '保存成功',
            })
            new Article({ ...req.body }).save();
        }
    })
})

//查看文章
route.post('/viewArticle',(req,res)=>{
    Article.findOne({...req.body},(err,articleInfo)=>{
        if(err){
            console.log('error',err)
        }
        if(!!articleInfo){
            res.send({
                code: 1,
                message: '查到该文章...',
                content: articleInfo
            })
        }else{
            res.send({
                code: 0,
                message: '没有该文章...'
            })
        }
    })
})

//删除文章
route.post('/deleteArticle',(req,res)=>{
    Article.remove({...req.body},(err,info)=>{
        if(err){
            console.log('error',err)
        }
        if(info){
            res.send({
                code: 1,
                message: '删除成功...'
            })
        }
    })
})

//查找需要编辑的文章
route.post('/editArticle',(req,res)=>{
    Article.findOne({...req.body},(err,info)=>{
        if(err){
            console.log('error',err);
        }
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

//编辑文章
route.post('/publishEditArticle',(req,res)=>{
    Article.findByIdAndUpdate({_id:req.body._id},
        {
            title:req.body.title,
            author:req.body.author,
            category:req.body.category,
            content:req.body.content
        },(err,info)=>{
            if(err){
                console.log('error',err)
            }
            if(!!info){
                res.send({
                    code: 1,
                    message: '更新成功...'
                })
            }
        })
})

//图片

//设置图片的存储路径
var uploadDir = '/project/Node/blogs/public/upload/';
var upload = multer({dest:uploadDir}).single('ShowPhoto');

route.post('/photo',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log('error----',err)
        }else{
            //获取文件名称，然后拼接成将来要存储的文件路径
            console.log(req.file);
            var newName = `${Date.now()}-${req.file.originalname}`;
            var des_file = uploadDir+newName;
            //读取临时文件
            fs.readFile(req.file.path,function(err,data){
                //将data写入文件中，写入一个新的文件
                fs.writeFile(des_file,data,function(err){
                    if(err){
                        console.log(err);
                        return;
                    }else{
                        var reponse = {
                            message: 'File uploaded successfully',
                            filename: req.file.originalname,
                            filepath: des_file
                        }
                        //删除临时文件
                        fs.unlink(req.file.path,function(err){
                            if(err){
                                console.log('error---',err)
                            }else{
                                console.log('delete'+req.file.path+'successfully')
                            }
                        })
                    }
                    res.send(reponse)
                })
            })
        }
    })
})

module.exports = route;


