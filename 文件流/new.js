const fs = require('fs');
var str = '文件内容为：';

// 创建一个可以写入的流，写入到文件 new.txt中
var writeStream = fs.createWriteStream('new.txt');

// 使用utf8编码写入数据
writeStream.write(str, 'UTF8');

// 标记文件末尾
writeStream.end();

// 处理流事件
writeStream.on('finish', function() {
    console.log('写入完成');
})

writeStream.on('error', function() {
    console.log('写入失败');
})