const http = require('http')
const PORT = 8000
// 引入 serverHandle处理函数
const serverHandle = require('./app')
// server 的处理函数写在app.js里面
const server = http.createServer(serverHandle)
// 端口号监听
server.listen(PORT, () => {
  console.log('server is running at 8000')
})