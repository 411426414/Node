const http = require('http');//导入http模块
const port = 3000;//端口号
const httpServer = http.createServer(function (req, res) {
    //设置响应头信息
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // 发送响应数据 "Hello World!"
    res.end('Hello World!\n');
});
httpServer.listen(port,function(){
    //向终端输出如下信息
    console.log(`服务器正在${port}端口上监听！`);
});