// 博客列表:数据格式数组包含对象,前端传入author和keyword
const  { exec } = require('../../bin/db/mysql')
const blogList = (author, keyword) => {
  let sql = `select * from blog where 1=1`
  if (author) {
    sql += ` and author='${author}'`
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`
  }
  sql += ` order by createTime desc;`
  return exec(sql)
}

// 获取博客详情
const getDetail = (id) => {
  let sql = `select * from blog where id=${id}`
  console.log(sql)
  // 返回的数组，取第一个
  return exec(sql).then((rows) => {
    return rows[0]
  })
}

// 新建一篇博客
const newBlog = (BlogData) => {
  const time = Date.now()
  const sql = `insert into blog (title, content, createTime, author) values ('${BlogData.title}', '${BlogData.content}', ${time}, '${BlogData.author}')`
  return exec(sql)
}

// 更新博客
const updateBlog = (BlogData) => {
  console.log(BlogData)
  let sql = `update blog set title='${BlogData.title}', content='${BlogData.content}' where id=${BlogData.id}`
  return exec(sql)
}

// 删除博客
const deleteBlog = (id) => {
  let sql = `delete from blog where id=${id}`
  return exec(sql)
}

module.exports = {
  blogList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}