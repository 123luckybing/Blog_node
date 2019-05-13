// 用户接口
const { ErrorModal, SuccessModal } = require('../model/resModal')
const { login, register } = require('../Controller/user')
const userRouer = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]

  // 登陆
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body
    const loginCheck = login(username, password)
    return loginCheck.then((res) => {
      if (res.username) {
        // 后端种cookie
        return new SuccessModal()
      } else {
        return new ErrorModal('登录失败')
      }
    }).catch(() => {
      return new ErrorModal('登录失败')
    })
  }

  // 注册
  if (method === 'POST' && path === '/api/user/register') {
    const { username, password, realName } = req.body
    const reg = register(username, password, realName)
    return reg.then((res) => {
      // 种cookie
      res.setHeader('Set-Cookie', `username=${username}; path=/`)
      return new SuccessModal(res)
    }).catch(() => {
      return new ErrorModal('注册失败')
    })
  }
}

module.exports = userRouer