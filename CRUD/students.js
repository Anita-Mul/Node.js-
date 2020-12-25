/**
 * students.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 */

var fs = require('fs');
var dbPath = './db.json';

/**
 * 获取所有学生列表
 * return []
 */

exports.find = function (callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            callback(err);
        }

        callback(null, JSON.parse(data).students);
    });
}

/**
 * 根据id查询单个学生
 * Student.findById(id, function(err, student){})
 */
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            callback(err);
        }

        var students = JSON.parse(data).students;

        //你要修改谁，就把谁找出来
        var stu = students.find(function (item) {
            return parseInt(item.id) === parseInt(id);
        })

        callback(null, stu);
    });
}

/**
 * 添加保存学生
 * callback的目的是捕获错误的
 */

exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            callback(err);
        }

        var students = JSON.parse(data).students;
        //遇到[Object: null prototype]我们可以先对对象进行JSON字符串转化(JSON.stringify())，然后再转化成对象(JSON.parse())
        student = JSON.stringify(student);
        student = JSON.parse(student);

        var students = JSON.parse(data).students;
        student.id = students[students.length - 1].id + 1;
        students.push(student);

        //注意这里的文件写入是清空再写入
        fs.writeFile('./db.json', JSON.stringify({ "students": students }), function (err, data) {
            if (err) {
                callback(err);
            }
            callback();
        });
    });
}

/**
 * 更新学生
 */

exports.updateById = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            callback(err);
        }

        var students = JSON.parse(data).students;

        //你要修改谁，就把谁找出来
        var stu = students.find(function (item) {
            return parseInt(item.id) === parseInt(student.id);
        })

        for (var key in student) {
            stu[key] = student[key];
        }

        //注意这里的文件写入是清空再写入
        fs.writeFile('./db.json', JSON.stringify({ "students": students }), function (err, data) {
            if (err) {
                callback(err);
            }
            callback();
        });
    });
}

/**
 * 删除学生
 */

exports.deleteById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            callback(err);
        }

        var students = JSON.parse(data).students;

        //findIndex方法专门用来根据条件查找元素的下标
        var deleteId = students.findIndex(function (item) {
            return item.id === parseInt(id);
        });

        students.splice(deleteId, 1);

        //注意这里的文件写入是清空再写入
        fs.writeFile('./db.json', JSON.stringify({ "students": students }), function (err, data) {
            if (err) {
                callback(err);
            }
            callback();
        });
    });
}