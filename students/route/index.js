
//引入router模块
const getRouter = require('router');
//获取路由对象
const router = getRouter();
//这个就是有返回值
const Student = require('../model/user.js');
//引入模板引擎
const template = require('art-template');
//引入queryString模块
const querystring = require('querystring');

//呈递学生档案信息页面
router.get('/add', (req, res) => {
    let html = template('index.html', {});
    res.end(html);
});
//呈递学生档案信息列表页面
router.get('/list', async (req, res) => {
    let students = await Student.find();
    let html = template('list.html', {
        students: students
    });
    res.end(html);
});

//实现学生信息添加功能路由
router.post('/add', (req, res) => {
    let forData = '';
    req.on('data', param => {
        forData += param;
    });
    req.on('end', async () => {
        await Student.create(querystring.parse(forData))
        res.writeHead(301, {
            Location: '/list'
        });
        res.end();
    });
});

module.exports = router;