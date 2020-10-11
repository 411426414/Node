const fs = require('fs');
var readStream = fs.createReadStream('read.txt');

// 创建一个可以写入的流，写入到文件 add.txt中
var writeStream = fs.createWriteStream('add.txt');
var str = '写入的文件内容为：';
 
readStream.on('data', function (value) {
    str += value;
    // 读取文件内容
    console.log(str);
    // 使用utf8编码写入数据
    writeStream.write(str, 'UTF8');
    // 标记文件末尾
    writeStream.end();
    // 处理流事件
    writeStream.on('finish', function () {
        console.log('写入完成');
    })
    writeStream.on('error', function () {
        console.log('写入失败');
    })
})
readStream.on('end', function (value) {
    console.log(str);
})