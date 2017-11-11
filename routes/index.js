var express = require('express')
var router = express.Router()
var Inquiry = require('../models/Inquiry')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/about', function(req, res, next) {
  res.render('about', null)
})

router.get('/inquiries', function(req, res, next) {
  Inquiry.find(null, function(err, inquiries) {
    if (err) {
      res.render('error', err)
      return
    }

    console.log(JSON.stringify(inquiries))
    var data = {
      list: inquiries
    }
    res.render('inquiries', data)
  })
})

router.get('/confirmation', function(req, res, next) {
  res.render('confirmation', null)
})

router.get('/project/:name', function(req, res, next) {
  var pages = ['podcast', 'venue', 'bookmark', 'ecommerce']
  var name = req.params.name

  if (pages.indexOf(name) == -1) {
    res.render('error', {message: "Page does not exist.  Please check your spelling."})
  }

  res.render(name, null)
})


router.post('/:action', function(req, res, next) {
  var action = req.params.action
  if (action == 'contact') {
    Inquiry.create(req.body, function(err, inquiry) {
      if (err) {
        res.json({
          confirmation: 'fail',
          message: err
        })

        return
      }

      
    })


    var helper = require('sendgrid').mail
    var from_email = new helper.Email(process.env.SENDGRID_DEFAULT_EMAIL)
    var to_email = new helper.Email(process.env.SENDGRID_DEFAULT_EMAIL)
    var subject = req.body.subject
    var content = new helper.Content('text/plain', req.body.message)
    var mail = new helper.Mail(from_email, subject, to_email, content)

    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    })

    sg.API(request, function(error, response) {
      console.log(response.statusCode)
      console.log(response.body)
      console.log(response.headers)
    
      if (error) {
        res.json({
          confirmation: 'fail',
          message: error
        })

        return
      }

      res.redirect('/confirmation')
      return
    })
  }
})

module.exports = router
