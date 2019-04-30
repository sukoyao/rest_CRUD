const express = require('express')
const app = express()
const mongoose = require('mongoose')
const restaurantList = require('./restaurant.json')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')

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

app.use(session({
  secret: 'your secret key',
}))
// 使用 Passport 
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
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