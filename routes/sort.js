const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// A > Z 升冪
router.get('/asc', (req, res) => {
  Restaurant.find({})
    .sort({
      name: 'asc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', {
        restaurants
      })
    })
})

// Z > A 降冪
router.get('/desc', (req, res) => {
  Restaurant.find({})
    .sort({
      name: 'desc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', {
        restaurants
      })
    })
})

// 餐廳評分
router.get('/rating', (req, res) => {
  Restaurant.find({})
    .sort({
      rating: 'desc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', {
        restaurants
      })
    })
})

// 餐廳類別
router.get('/category', (req, res) => {
  Restaurant.find({})
    .sort({
      category: 'asc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', {
        restaurants
      })
    })
})

// 設定 /todos 路由
module.exports = router