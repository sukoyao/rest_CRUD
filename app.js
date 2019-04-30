const express = require('express')
const app = express()
const mongoose = require('mongoose')
const restaurantList = require('./restaurant.json')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

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

app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurant'))
app.use('/sort', require('./routes/sort'))
app.use('/users', require('./routes/user'))

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