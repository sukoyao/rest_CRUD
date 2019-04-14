const express = require('express')
const app = express()
const mongoose = require('mongoose')

// 引用 express-handlebars
const exphbs = require('express-handlebars');

// 告訴 express 使用 handlebars 當作 template engine 並預設 layout 是 main
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 載入 restaurant model
const Restaurant = require('./models/restaurant')

// 設定連線到 mongoDB 加上 { useNewUrlParser: true }
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })

// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定路由
app.get('/', (req, res) => {
  return res.render('index')
})

// 列出全部 restaurant
app.get('/restaurants', (req, res) => {
  res.send('列出所有 restaurant')
})

// 新增一筆 restaurant 頁面
app.get('/restaurants/new', (req, res) => {
  res.send('新增 restaurant 頁面')
})

// 顯示一筆 restaurant 的詳細內容
app.get('/restaurants/:id', (req, res) => {
  res.send('顯示 restaurant 的詳細內容')
})

// 新增一筆  restaurant
app.post('/restaurants', (req, res) => {
  res.send('建立 restaurant')
})

// 修改 restaurant 頁面
app.get('/restaurants/:id/edit', (req, res) => {
  res.send('修改 restaurant 頁面')
})

// 修改 restaurant
app.post('/restaurants/:id', (req, res) => {
  res.send('修改 restaurant')
})

// 刪除 restaurant
app.post('/restaurants/:id/delete', (req, res) => {
  res.send('刪除 restaurant')
})


app.listen(3000, () => {
  console.log('App is running!')
})