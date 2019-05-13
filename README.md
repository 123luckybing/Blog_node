# thesis_node
毕业论文后端接口

1. 安装 nodemon和cross-env
cross-env: 功能监听环境变量(测试环境、开发环境等)
npm install nodemon  cross-env --save-dev
2. 在package.json里test下面增加dev配置
（dev表示开发环境）:NODE_ENV=dev
起项目的时候就npm run dev可以
以下就是nodemon打印出来的～～
[nodemon] 1.18.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node ./bin/www.js`
nodemon: 改动代码自动重启，检测文件变化，重启node
3. router文件夹定义路由
4. controller文件夹从数据库获取数据
5. 下载mysql和mysql-workbench
6. 操作数据库
 （1）建库
 （2）建表
 增： 
    use thesis;
    insert into area(province, `type`, `year`, firstScore, secondScore, thirdScore) values ('黑龙江', '文科', '2015','495','410','333')
 删：delete from 表名称 WHERE 列名称 = 值
 查：
    并 => select * from area where username='zhangsan' and password='123'
    或：=> select * from area where username='zhangsan' or username='lisi'
    模糊查询： => username中含有zhang的 zhang前后加%
                selct * from area where username like '%zhang%' or username='lisi'
    排序：=> select * from area where username='zhangsan' order by id; 
            (按照id排序，默认升序)
            select * from area where username='zhangsan' order by id desc;
            (降序)
改：update area set realName='lisi' where id=3
     把表area中id=3的realName改成lisi
不等于<>
7. node连接数据库
   npm install mysql
   在bin下见一个文件夹 config 再再下建一个db.js,mysql配置
8. 再建立一个db文件夹 mysql.js
9. 踩坑报错：
  1. getaddrinfo ENOTFOUND localhost localhost:3306 ---> 电脑断网
  没有开启 host
10. 入口文件： package.json --> main
11. 获取环境变量： process.env.NODE_ENV