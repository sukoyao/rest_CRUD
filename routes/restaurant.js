const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// 新增一筆 restaurant 頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

// 顯示一筆 restaurant 的詳細內容
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('show', { restaurant })
  })
})

// 新增一筆  restaurant
router.put('/', (req, res) => {
  const restaurant = Restaurant(req.body)

  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// 修改 restaurant 頁面
router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant })
  })
})

// 修改 restaurant
router.put('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
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
router.delete('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

// 設定 /todos 路由
module.exports = router