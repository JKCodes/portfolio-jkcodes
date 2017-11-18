var express = require('express')
var router = express.Router()
var superagent = require('superagent')

function getResource(res, resource, page) {
  console.log(process.env.HEROKU_URL || process.env.DEV_URL)
  superagent
  .get(`${process.env.HEROKU_URL || process.env.DEV_URL}/api/${resource}`)
  .query(null)
  .set('Accept', 'application/json')
  .end((err, response) => {
    if (err) {
      res.render('error', {message: err, response: process.env.HEROKU_URL})
      return
    }

    var data = {
      list: JSON.parse(response.text).results
    }
    res.render(page, data)
  })
}

function postResource(params, res, resource, page) {
  superagent
  .post(`${process.env.HEROKU_URL || process.env.DEV_URL}/api/${resource}`)
  .send(params)
  .set('Accept', 'application/json')
  .end((err, response) => {
    if (err) {
      res.render('error', err)
      return
    }

    res.redirect(page)
  })
}

function getResourceById(id, res, resource, page) {
  superagent
  .get(`${process.env.HEROKU_URL || process.env.DEV_URL}/api/${resource}/${id}`)
  .query(null)
  .set('Accept', 'application/json')
  .end((err, response) => {
    if (err) {
      res.render('error', err)
      return
    }

    res.render(page, JSON.parse(response.text).result)
  })
}

router.get('/', function(req, res, next) {
  getResource(res, 'project', 'index')
})

router.get('/:page', function(req, res, next) {
  var page = req.params.page
  if (page == 'api') {
    next()
    return
  }

  if (page == null) {
    res.render('/confirmation')
  }

  if (page == 'inquiries') {
    getResource(res, 'inquiry', page)
    return
  }

  if (page == 'about') {
    getResource(res, 'project', page)
    return
  }

  var staticPages = {
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

  getResourceById(projectId, res, 'project', 'project')
})

router.get('/updateproject/:id', function(req, res, next) {
  var projectId = req.params.id

  getResourceById(projectId, res, 'project', 'updateproject')
})


// POST

router.post('/:action', function(req, res, next) {
  var action = req.params.action

  if (action == 'project') {
    var params = req.body
    var tools = params.tools
    params['tools'] = tools.split(',').map((tool) => tool.trim())

    postResource(params, res, 'project', '/')
    return
  }

  if (action == 'contact') {
    postResource(req.body, res, 'inquiry', '/confirmation')
    return
  }
})

// PUT

router.put('/project/:id', function(req, res, next) {
  var id = req.params.id
  var params = req.body
  var tools = params.tools
  params['tools'] = tools.split(',').map((tool) => tool.trim())

  superagent
  .put(`${process.env.HEROKU_URL || process.env.DEV_URL}/api/project/${id}`)
  .send(params)
  .set('Accept', 'application/json')
  .end((err, response) => {
    if (err) {
      res.render('error', err)
      return
    }

    res.redirect(`/project/${id}`)
  })
})

module.exports = router
