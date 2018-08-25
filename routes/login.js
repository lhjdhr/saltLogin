var express=require('express');
var router=express.Router();//可以使用express.Router()类创建模块化
var bodyParser=require('body-parser');//数据解析获取表单提交的数据
var DB=require('../modules/db.js');
const crypto = require("crypto");
const random = require("../modules/random");
const Base64 = require("../modules/base64");

router.use(bodyParser.urlencoded({ extended: false }));// 设置body-parser中间件，获取post，解析获取的
router.use(bodyParser.json());

router.get('/',function (req,res) {
    res.render('login')
});

router.post("/regest",(req,res)=>{
    console.log(req.body);
    let randomWord = random(false,8); //1.生成8位的随机数
    let base64 = new Base64();
    let base64Random = base64.encode(randomWord); //2.对生成的随机数加密

    let username = req.body.username;
    let password = req.body.password;
    let repassword = req.body.repassword;
    if(password !=repassword){
        res.send("2次密码不一致");
        return;
    }
    let newPas = base64Random + password;//3.将第二步的值与密码拼接
    let md5 = crypto.createHash("md5");
    let md5Pas = md5.update(newPas).digest("hex"); //4.将第三步的进行md5加密
    let base64Md5 = base64.encode(md5Pas);//5.将第四步进行base64加密
    let lastPassword = base64Random + base64Md5;  //6.将第二步与第五步拼接

    DB.insert('user',{
        username:username,
        lastPassword:lastPassword
    },function (err,data) {
        if (err){
            console.log("注册失败");
            res.render('login')
        }
        console.log(data);
        if (data){
            console.log("注册成功");
            res.render('login')
        }
    })
});
router.post('/doLogin',function(req,res){//获取登录提交的数据
    var username=req.body.username;
    var password=req.body.password;  /*要对用户输入的密码加密*/
    console.log(username);
    console.log(password);
    DB.find('user',{                        //1.获取数据
        username:username                //2.连接数据库查询数据
    },function(err,data){
        if (err){
            res.send("发生错误");
        }
        if (data){
            console.log(data[0].lastPassword);
            let base64Random = data[0].lastPassword.substring(0,12);//1.获取到的密码截取前面随机数通过base64加密的结果
            let newPas = base64Random + password;//2.将第一步的结果与用户输入的密码拼接
            let md5 = crypto.createHash("md5"); //3.将第二步的结果进行MD5加密
            let md5Pas = md5.update(newPas).digest("hex");
            let base64 = new Base64();
            let base64Md5 = base64.encode(md5Pas);//4.将第三步进行base64加密
            let lastPassword = base64Random + base64Md5;//5.将第一步与第四步拼接
            if (data[0].lastPassword === lastPassword){
                req.session.userinfo=data[0];
                res.send("登录成功");
            }else {
                console.log("用户名或密码错误");
                res.render('login')
            }
        }
    })
});
router.get('/loginOut',function (req,res) {
    req.session.destroy(function (err) {
        if(err){
            console.log(err);
        }else{
            res.redirect('/login')
        }

    })
});
module.exports=router;