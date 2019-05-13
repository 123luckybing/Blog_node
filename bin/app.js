const queryString = require('querystring') // 将参数转化成对象
const handleuserRouer = require('../src/router/user')
const handleBlogRouter = require('../src/router/blog')

// 处理postdata
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      // 如果是get请求，返回空
      resolve({})
      return
    }
    // 如果前端返回的格式不对，返回空
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    // 如果都正确，进行数据处理
    let postData = ''
    req.on('data', (chunk) => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) { // 如果为空 返回空
        resolve({})
        return
      } else {
        resolve(JSON.parse(postData))
      }
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  // 设置返回格式
  res.setHeader('Content-type', 'application/json')
  // 解析url参数
  req.query = queryString.parse(req.url.split('?')[1])

  // 解析cookie,把字符串变成对象 req.headers.cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''; // name=zhangsan;age=12
  cookieStr.split('; ').forEach(elem => {
    if (!elem) {
      return false
    }
    const arr = elem.split('=')
    const key = arr[0]
    const value = arr[1]
    req.cookie[key] = value
  });

  if (req.cookie.username) {
    // 种cookie httpOnly 前端不能通过js修改
    res.setHeader('Set-Cookie', `username=${req.cookie.username}; path=/; httpOnly`)
  }
  console.log(req.cookie)
 
  // 处理postData
  getPostData(req).then((postData) => {
    req.body = postData // 把postData复制到req.body里
    // 处理blog路由(命中blog)
    const blogResult = handleBlogRouter(req, res) // promise
    if (blogResult) {
      blogResult.then((blogData) => {
        // 如果只不为空, 则返回后端返回给前端
        if (blogData) {
          res.end(
            JSON.stringify(blogData)
          )
        }
      })
      return 
    }
    // 处理user路由(命中user)
    const userData = handleuserRouer(req, res)
    if (userData) {
      userData.then((loginData) => {
        if (loginData) {
          res.end(
            JSON.stringify(loginData)
          )
        }
      })
      return
    }

    // 如果都没有命中blog和user,返回404文本
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()
    })
  }

module.exports = serverHandle