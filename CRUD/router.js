
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

    Students.save(req.body, function (err) {
        if (err) {
            console.log('保存失败了');
        }
        res.redirect('/students');
    });
});

router.get('/students/edit', function (req, res) {
    Students.findById(parseInt(req.query.id), function (err, student) {
        if (err) {
            res.status(500).send('Server error');
        }
        res.render('edit.html', {
            student: student
        });
    });
});

router.post('/students/edit', function (req, res) {
    Students.updateById(
        req.body, function (err) {
            if (err) {
                console.log('保存失败了');
            }
            res.redirect('/students');
        }
    );
});

router.get('/students/delete', function (req, res) {
    Students.deleteById(req.query.id, function (err) {
        if (err) {
            res.status(500).send('Server error');
        }

        res.redirect('/students');
    });
});



module.exports = router;