const mongoose = require('mongoose')

//连接数据库，不想看到提示信息，就加上第二个参数 useUnifiedTopology: true
mongoose.connect('mongodb://localhost/playground', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'))