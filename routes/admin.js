/**
 * Created by 李会娟 on 2018/8/17.
 */
var express=require('express');
var router=express.Router();

//该路由使用的中间插件
router.get('/',function(req,res){
    res.send("admin")
});

module.exports=router;