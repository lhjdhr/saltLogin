/**
 * Created by 李会娟 on 2018/8/8.
 */

$(document).ready(function() {
    //打开会员登录
    $("#Login_start_").click(function() {
        $("#regist_container").hide();
        $("#_close").show();
        $("#_start").animate({
            left: '350px',
            height: '520px',
            width: '400px'
        }, 500, function() {
            $("#login_container").show(500);
            $("#_close").animate({
                height: '40px',
                width: '40px'
            }, 500);
        });
    });
    //打开会员注册
    $("#Regist_start_").click(function() {
        $("#login_container").hide();
        $("#_close").show();
        $("#_start").animate({
            left: '350px',
            height: '520px',
            width: '400px'
        }, 500, function() {
            $("#regist_container").show(500);
            $("#_close").animate({
                height: '40px',
                width: '40px'
            }, 500);
        });
    });
    //关闭
    $("#_close").click(function() {

        $("#_close").animate({
            height: '0px',
            width: '0px'
        }, 500, function() {
            $("#_close").hide(500);
            $("#login_container").hide(500);
            $("#regist_container").hide(500);
            $("#_start").animate({
                left: '0px',
                height: '0px',
                width: '0px'
            }, 500);
        });
    });
    //去 注册
    $("#toRegist").click(function(){
        $("#login_container").hide(500);
        $("#regist_container").show(500);
    });
    //去 登录
    $("#toLogin").click(function(){
        $("#regist_container").hide(500);
        $("#login_container").show(500);
    });
});