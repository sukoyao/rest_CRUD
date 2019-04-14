const express = require('express')
const app = express()
const mongoose = require('mongoose')
const restaurantList = require('./restaurant.json')

// 引用 express-handlebars
const exphbs = require('express-handlebars');

// 告訴 express 使用 handlebars 當作 template engine 並預設 layout 是 main
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

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
  Restaurant.find((err, restaurants) => {    // 把 Restaurant model 所有的資料都抓回來
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurantList.results })  // 將資料傳給 index 樣板
  })
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

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.filter(restaurant => restaurant.id == req.params.restaurant_id)
  res.render('show', { restaurant: restaurant[0] })
})

// 搜尋 restaurant
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.listen(3000, () => {
  console.log('App is running!')
})