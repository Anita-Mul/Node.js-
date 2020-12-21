//引入http模块
const http = require('http');
//引入日期格式化模块
const dateformat = require('dateformat');
//引入queryString模块
const querystring = require('querystring');
//引入模板引擎
const template = require('art-template');
//引入path模块，可以将路径拼接（去查查）
const path = require('path');

const router = require('./route/index')
//引入静态资源访问模块
const serveStatic = require('serve-static')
// 实现静态资源访问服务
const serve = serveStatic(path.join(__dirname, 'public'))
//没有返回值就是加载这个模块
//导入数据库模块
require('./model/connect.js');
//这个就是有返回值
const Student = require('./model/user.js');

//配置模板根目录
//__dirname用来获取当前文件的绝对路径
template.defaults.root = path.join(__dirname, 'views');
//处理日期格式的方法
template.defaults.imports.dateformat = dateformat;





//创建服务器
const app = http.createServer();

app.on('request', (req, res) => {
    router(req, res, () => {
        //请求结束之后才会有，就是圈圈不转了
        //console.log('为啥子没有我');
    })
    //静态资源访问服务
    serve(req, res, () => { })
});

app.listen(80);
console.log('服务器启动成功');









