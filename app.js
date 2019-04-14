const express = require('express')
const app = express()
const mongoose = require('mongoose')

// 加上 { useNewUrlParser: true }
mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true })
// 設定路由
app.get('/', (req, res) => {
  res.send('hello world')
})

mongoose.connect('mongodb://localhost/restaurant')   // 設定連線到 mongoDB

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

// 載入 restaurant model
const Restaurant = require('./models/restaurant')

app.get('/', (req, res) => {
  res.send('hello world!')
})

app.listen(3000, () => {
  console.log('App is running!')
})