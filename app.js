const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const app = express()
const Restaurant = require('./models/restaurant')
const port = 3000

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config() // 使用 dotenv 讀取 .env 檔案
}

// setting mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurants', {
  useNewUrlParser: true,
  useCreateIndex: true
})
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// template engine
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
)

app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(methodOverride('_method'))

app.use(
  session({
    secret: 'key',
    resave: 'false',
    saveUninitialized: 'false'
  })
)

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// routes
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurant'))
app.use('/search', require('./routes/search'))
app.use('/sort', require('./routes/sort'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))

// start and listen
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})