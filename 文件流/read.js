const fs = require('fs');
var readStream = fs.createReadStream('read.txt');

var str = '文件内容为：';
readStream.on('data', function(value) {
    str += value;
})

readStream.on('end', function(value){
    console.log(str);
})

readStream.on('error', function(value){
    console.log(err);
})