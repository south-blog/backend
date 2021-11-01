import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD
} = process.env

const connection = mysql.createConnection({
  host: DATABASE_HOST, // 数据库地址
  port: parseInt(DATABASE_PORT as string), // 端口号
  user: DATABASE_USER, // 用户名
  password: DATABASE_PASSWORD, // 密码
  database: DATABASE_NAME, // 数据库名称
  multipleStatements: true // 执行多行
});

export default connection
