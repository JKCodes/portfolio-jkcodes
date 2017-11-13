var express = require('express')
var router = express.Router()
var Inquiry = require('../models/Inquiry')
var Project = require('../models/Project')

router.get('/', function(req, res, next) {

  Project.find(null, function(err, projects) {
    if (err) {
      res.render('error', err)
      return
    }

    var data = {
      list: projects
    }

    res.render('index', data)
  })
})

router.get('/:page', function(req, res, next) {
  var page = req.params.page

  if (page == 'inquiries') {
    Inquiry.find(null, function(err, inquiries) {
      if (err) {
        res.render('error', err)
        return
      }

      var data = {
        list: inquiries
      }
      res.render('inquiries', data)
    })

    return
  }

  var staticPages = {
    about: 'about',
    createproject: 'createproject',
    confirmation: 'confirmation'
  }

  var template = staticPages[page]
  
  if (template ==  null) {
    res.render('error', {message: 'Invalid Page'})
    return
  }

  res.render(page, null)
})

router.get('/project/:id', function(req, res, next) {

  var projectId = req.params.id
  Project.findById(projectId, function(err, project) {
    if (err) {
      res.render('error', err)
      return
    }

    res.render('project', project)
  })
})


// POST

router.post('/:action', function(req, res, next) {
  var action = req.params.action

  if (action == 'project') {
    var params = req.body
    var tools = params.tools
    params['tools'] = tools.split(',').map((tool) => tool.trim())

    Project.create(req.body, function(err, project) {
      if (err) {
        res.render('error', err)

        return
      }

      res.json({
        project: project
      })
    })

    return
  }

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
