const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const { authenticated } = require('../config/auth')

// 列出全部 餐廳
router.get('/', authenticated, (req, res) => {
  res.send('列出所有 餐廳')
})

// 新增一筆 餐廳 頁面
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})

// 新增一筆 餐廳
router.post('/', authenticated, (req, res) => {
  // 將使用者送出的 req.body 作為參數傳入 Restaurant 物件使用，即可賦予資料
  const restaurant = Restaurants({ ...req.body, userId: req.user._id })

  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// 顯示一筆 餐廳 的詳細內容
router.get('/:id', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('show', {
      restaurant: restaurant
    })
  })
})

// 修改 餐廳 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', {
      restaurant: restaurant
    })
  })
})

// 修改 餐廳
router.put('/:id', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)

    // 更新表單資料，Object.assign(target array, ...sources array)
    Object.assign(restaurant, req.body)

    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

// 刪除 餐廳
router.delete('/:id/delete', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router