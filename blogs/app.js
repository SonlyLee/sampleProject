const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const cookieParse = require('cookie-parser');
const path = require('path')

const app = express()

app.use(cookieParse());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:false}));
app.use(express.static('public'));

app.use('/api/admin',require('./api/admin.js'));
app.use('/api/article',require('./api/article.js'))
app.use('/api/user',require('./api/user.js'))
app.listen(8000,()=>{
    console.log('server start at http://localhost:8000');
});

mongoose.connect('mongodb://localhost:27017/Blogs',function(err){
    if(err){
        console.log('Mongo connection error');
    }else{
        console.log('Mongo connection successed');
    }
})