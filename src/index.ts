import express from 'express'
import router from './router';
import connection from './utils/connection'
import cookieSession from 'cookie-session';
import './controller'

const app = express()

app.all("*", function(request, response, next){
  response.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  response.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式
  response.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (request.method.toLowerCase() == 'options')
    response.send(200);  //让options尝试请求快速结束
  else
    next();
});

connection.connect()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieSession({
  name: 'session',
  keys: ['isLogin'],
  maxAge: 24 * 60 * 60 * 1000
}))
app.use(router)

app.listen(5000, '0.0.0.0', () => {
  console.log('server success!');
})