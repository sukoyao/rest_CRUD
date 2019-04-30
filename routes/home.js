const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const { authenticated } = require('../config/auth')

// 設定路由
router.get('/', authenticated, (req, res) => {
  Restaurant.find({ userId: req.user._id })
    .sort({ name: 'asc' })
    .exec((err, restaurants) => {    // 把 Restaurant model 所有的資料都抓回來
      if (err) return console.error(err)
      return res.render('index', { restaurants })  // 將資料傳給 index 樣板
    })
})

module.exports = router