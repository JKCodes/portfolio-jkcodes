var express = require('express')
var router = express.Router()
var sendgrid = require('sendgrid')

router.get('/', function(req, res, next) {

  res.json({
    confirmation: 'success',
    message: "HI"
  })

})

module.exports = router;
