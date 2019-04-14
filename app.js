const express = require('express')
const app = express()

// 設定路由
app.get('/', (req, res) => {
  res.send('hello world')
})

// 設定 express port 3000
app.listen(3000, () => {
  console.log('App is running')
})