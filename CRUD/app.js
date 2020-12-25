/**
 * app.js入门
 * 职责：
 *  创建服务
 *  做一些服务相关配置
 *      模板引擎
 *      body-parser 解析表单post请求体
 *      提供静态资源服务
 *  挂载路由
 *  监听端口启动服务
 **/
var express = require('express');
var router = require('./router.js');
var app = express();

var bodyParser = require('body-parser');
//配置模块引擎和body-parser一定要在app.use(router)挂载路由之前
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//开放静态资源
app.use('/node_modules/', express.static('./node_modules'));
app.use('/public/', express.static('./public'));

app.engine('html', require('express-art-template'));


//router(app);   第一种方法
//第二种方法：把路由器挂载到app服务中
app.use(router);

app.listen(3000, function () {
    console.log('running');
});

module.exports = app;


