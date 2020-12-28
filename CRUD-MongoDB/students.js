var mongoose = require('mongoose');


var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/itcast', { useMongoClient: true });

var studentSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    age: {
        type: Number,
    },
    hobbies: {
        type: String
    }
});

//直接导出模型的构造函数
module.exports = mongoose.model('Students', studentSchema);

