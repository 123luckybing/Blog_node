const mysql = require('mysql')
const MYSQL_CONFIG = require('../conf/db')
// 创建连接对象
const con = mysql.createConnection(MYSQL_CONFIG)

// 开始连接
con.connect()

// 统一执行sql的函数,封装promise
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            } else {
                resolve(result)
            }
        })
    })
    return promise
}

module.exports = { exec }