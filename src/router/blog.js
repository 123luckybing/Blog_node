const {
  blogList,
  getDetail,
  newBlog,
  deleteBlog,
  updateBlog
 } = require('../Controller/blog')
const { ErrorModal, SuccessModal } = require('../model/resModal')
// 博客接口
const handleBlogRouter = (req, res) => {
  // res 是后端返回给前端的 req是前端返回给后端的
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const id = req.query.id

  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    // 传参数：author && keyword
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const result = blogList(author, keyword) // result是一个promise
    return result.then((res) => {
      return new SuccessModal(res)
    }).catch((err) => {
      return new ErrorModal(err)
    })
  }

  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const blogDetail = getDetail(id)
    return blogDetail.then((res) => {
      return new SuccessModal(res)
    }).catch((err) => {
      return new ErrorModal(err)
    })
  }

  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    // post数据在req.body里
    req.body.author = 'zhou'
    const blogData = req.body
    const data = newBlog(blogData)
    return data.then((res) => {
      return new SuccessModal(res)
    }).catch((err) => {
      return new ErrorModal(err)
    })
  }

  // 更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    const BlogData = req.body
    const result = updateBlog(BlogData)
    return result.then((res) => {
      return new SuccessModal(res)
    }).catch((err) => {
      return new ErrorModal(err)
    })
  }

  // 删除一篇博客
  if (method === 'GET' && path === '/api/blog/delete') {
    const result = deleteBlog(id)
    return result.then((res) => {
      return new SuccessModal(res)
    }).catch(() => {
      return new ErrorModal('删除博客失败')
    })
  }
}

module.exports = handleBlogRouter