const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  const keyword = req.query.keyword

  Restaurant.find({
    userId: req.user._id,
    name: {
      $regex: keyword,
      $options: 'i'
    }
  }).exec((err, restaurant) => {
    if (err) return console.error(err)
    return res.render('index', {
      restaurants: restaurant,
      keyword: keyword
    })
  })
})

module.exports = router