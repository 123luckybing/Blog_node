const  { exec } = require('../../bin/db/mysql')
const login = (username, password) => {
  let sql = `select * from users where username='${username}' and pwd='${password}'`
  return exec(sql).then((rows) => {
    return rows[0] || {}
  })
}

const register = (username, password, realName) => {
  let sql = `insert into users (username, pwd, realname) values ('${username}', '${password}', '${realName}')` 
  return exec(sql)
}

module.exports = { 
  login,
  register
}