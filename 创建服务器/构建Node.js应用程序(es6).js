const http = require('http')
const hostname = 'localhost'
const port = 3000

const server = http.createServer((req,res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('你好世界！\n','charset:utf-8')
})

server.listen(port,hostname, () => {
    //向终端输出如下信息
    console.log(`服务器正在 http://${hostname}:${port} 端口上监听！`);
});
