var express = require('express')
var router = express.Router()
var superagent = require('superagent')

function getResource(res, resource, page) {
  superagent
  .get(`http://localhost:3000/api/${resource}`)
  .query(null)
  .set('Accept', 'application/json')
  .end((err, response) => {
    if (err) {
      res.render('error', err)
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
  .post(`http://localhost:3000/api/${resource}`)
  .send(params)
  .set('Accept', 'application/json')
  .end((err, response) => {
    if (err) {
      res.render('error', err)
      return
    }

    console.log(response.text)

    res.redirect(page)
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

  superagent
  .get(`http://localhost:3000/api/project/${projectId}`)
  .query(null)
  .set('Accept', 'application/json')
  .end((err, response) => {
    if (err) {
      res.render('error', err)
      return
    }

    console.log(response.text)

    res.render('project', JSON.parse(response.text).result)
  })
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

module.exports = router
