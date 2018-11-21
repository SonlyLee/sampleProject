const User = require('./../model/user.js');
const express = require('express');
const route = express.Router();

//用户登录
route.post('/login', (req, res) => {
    console.log(req.body)
    User.findOne({ name: req.body.name }, (err, userInfo) => {
        if (err) {
            console.log('error', err)
        } 
        if (!userInfo) {
            //表示没有该记录
            res.send({
                code: 0,
                message: '用户名不存在，请先注册！'
            })
        } else {
            if (req.body.password == userInfo.password) {
                res.cookie('name',req.body.name,{maxAge: 1000*60*60*24})
                res.send({
                    code: 1,
                    message: '登录成功！'
                });                                
            } else {
                res.send({
                    code: 2,
                    message: '密码错误！'
                })
            }
        }
    })

})

//用户注册
route.post('/register',(req,res)=>{
    // console.log({...req.body});
    User.findOne({name:req.body.name},(err,userInfo)=>{
        if(err){
            console.log('error',err)
        }
        if(!!userInfo){
            res.send({
                code: 0,
                message: '用户名已经存在，请重新输入！'
            })
        }else{
            res.send({
                code: 1,
                message: '注册成功'
            })
            new User({...req.body}).save();
        }
    })
})
module.exports = route;