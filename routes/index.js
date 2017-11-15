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
  if (page == 'api') {
    next()
    return
  }

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
    confirmation: 'confirmation',
    contact: 'contact',
    blog: 'blog'
  }

  var template = staticPages[page]
  
  if (template ==  null) {
    res.render('error', {message: 'Invalid Page'})
    return
  }

  if (template == 'blog') res.redirect('http://jkcodes.com/')
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
    Inquiry.create(req.body, function(err) {
      if (err) {
        res.render('error', err)
        return
      }

      res.redirect('/confirmation')
    })
  }
})

module.exports = router
