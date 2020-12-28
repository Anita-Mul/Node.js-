
var fs = require('fs');
var Students = require('./students.js');


//第一种方法
// module.exports = function (app) {
//     app.get('/students', function (req, res) {

//     });
// }

// ————————————————————————————————————————————————————————————————————————————————————————————————————————


//第二种方法
var express = require('express');
const bodyParser = require('body-parser');
const { stderr } = require('process');
//创建一个路由容器
var router = express.Router();


//把路由都挂载到路由容器中
router.get('/students', function (req, res) {
    //readFile的第二个参数是可选的，传入utf-8就是告诉它把读取到的文件直接按照utf8编码转成我们能认识的字符
    //除了这样来转换之外，也可以通过data.toString()的方式
    // fs.readFile('./db.json', 'utf8', function (error, data) {
    //     if (error) {
    //         res.status(500).send("server error");
    //     }
    //     res.render('index.html', {
    //         //从文件中读取到的数据一定是字符串，所以要手动转化成对象
    //         "students": JSON.parse(data).students
    //     });
    // });

    Students.find(function (err, data) {
        if (err) {
            res.status(500).send('Server error');
        }

        res.render('index.html', {
            students: data
        });
    });
});


router.get('/students/new', function (req, res) {
    res.render('new.html', {});
});

router.post('/students/new', function (req, res) {

    //这里修改了，得先new出一个实例对象才可以save
    new Students(req.body).save(function (err) {
        if (err) {
            console.log('保存失败了');
        }
        res.redirect('/students');
    });
});

//我悟了，它的id是舞会89isj之类，有除了数字之外的，所以不用parseInt
router.get('/students/edit', function (req, res) {
    Students.findById(req.query.id.replace(/"/g, ''), function (err, student) {
        if (err) {
            res.status(500).send('Server error');
        }
        res.render('edit.html', {
            student: student
        });
    });
});

//replace支持字符串模式和正则表达式模式
router.post('/students/edit', function (req, res) {
    //为啥不是_id name
    Students.findByIdAndUpdate(req.body.id.replace(/"/g, ''),
        req.body, function (err) {
            if (err) {
                console.log('保存失败了');
            }
            res.redirect('/students');
        }
    );
});

//注意是req.query还是req.body是post请求还是给请求
router.get('/students/delete', function (req, res) {
    Students.findByIdAndRemove(req.query.id.replace(/"/g, ''), function (err) {
        if (err) {
            res.status(500).send('Server error');
        }

        res.redirect('/students');
    });
});



module.exports = router;