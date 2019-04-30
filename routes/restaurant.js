const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const { authenticated } = require('../config/auth')

// 新增一筆 restaurant 頁面
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})

// 顯示一筆 restaurant 的詳細內容
router.get('/:id', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('show', { restaurant })
  })
})

// 新增一筆  restaurant
router.post('/', authenticated, (req, res) => {
  const restaurant = Restaurant({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
    // 儲存 userId
    userId: req.user._id,
  })
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// 修改 restaurant 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant })
  })
})

// 修改 restaurant
router.put('/:id', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    // before
    // restaurant.name = req.body.name
    // restaurant.category = req.body.category
    // restaurant.image = req.body.image
    // restaurant.location = req.body.location
    // restaurant.phone = req.body.phone
    // restaurant.google_map = req.body.google_map
    // restaurant.rating = req.body.rating
    // restaurant.description = req.body.description
    // after
    Object.assign(restaurant, req.body)

    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

// 刪除 restaurant
router.delete('/:id/delete', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

// 設定 /todos 路由
module.exports = router