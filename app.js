var express=require('express');
var app=express();

var session=require("express-session");//保存用户信息
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge:1000*60*30
    },
    rolling:true
}));

var login=require('./routes/login'),
     index=require('./routes/index'),
     admin=require('./routes/admin');
app.set('view engine','ejs');
app.use(express.static('public'));
app.use('/upload',express.static('upload'));

app.locals['userinfo']='req.session.userinfo' //ejs中 设置全局数据，所有的界面都可使用

app.use('/upload',express.static('upload')); //路由模块
app.use('/',index);
app.use('/admin',admin);
app.use('/login',login);

app.listen(8010);
console.log("http://127.0.0.1:8010/login");

