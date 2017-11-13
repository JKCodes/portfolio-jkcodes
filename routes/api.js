var express = require('express')
var router = express.Router()
var Project = require('../models/Project')

router.get('/:resource', function(req, res, next) {
  var resource = req.params.resource

  if (resource == 'project') {
    Project.find(req.query, function(err, projects) {
      if (err) {
        res.json({
          confirmation: 'fail',
          message: err
        })

        return
      }

      res.json({
        confirmation: 'success',
        results: projects
      })
    })
  }
})

router.get('/:resource/:id', function(req, res, next) {
  var resource = req.params.resource
  var id = req.params.id

  if (resource == 'project') {
    Project.findById(id, function(err, project) {
      if (err) {
        res.json({
          confirmation: 'fail',
          message: 'There is no project with that id'
        })

        return
      }

      res.json({
        confirmation: 'success',
        result: project
      })
    })
  }
})

router.post('/:resource', function(req, res, next) {
  var resource = req.params.resource

  if (resource == 'project') {
    Project.create(req.body, function(err, project) {
      if (err) {
        res.json({
          confirmation: 'fail',
          message: err
        })

        return
      }

      res.json({
        confirmation: 'success',
        result: project
      })
    })
  }
})

router.put('/:resource/:id', function(req, res, next) {
  var resource = req.params.resource
  var id = req.params.id

  if (resource == 'project') {
    Project.findByIdAndUpdate(id, req.body, {new:true} function(err, project) {
      if (err) {
        res.json({
          confirmation: 'fail',
          message: err
        })

        return
      }

      res.json({
        confirmation: 'success',
        result: project
      })
    })
  }
})

router.delete('/:resource/:id', function(req, res, next) {
  var resource = req.params.resource
  var id = req.params.id

  if (resource == 'project') {
    Project.findByIdAndRemove(id, function(err) {
      if (err) {
        res.json({
          confirmation: 'fail',
          message: err
        })

        return
      }

      res.json({
        confirmation: 'success',
      })
    })
  }
})

module.exports = router