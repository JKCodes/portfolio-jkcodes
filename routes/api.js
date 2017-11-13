var express = require('express')
var router = express.Router()
var Project = require('../models/Project')

router.get('/:resource', function(req, res, next) {
  var resource = req.params.resource

  if (resource == 'project') {
    Project.find(null, function(err, projects) {
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

module.exports = router