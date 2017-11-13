var Project = require('../models/Project')

module.exports = {
  find: function(params, callback) {
    Project.find(params, function(err, projects) {
      if (err) {
        callback(err, null)
        return
      }

      callback(null, projects)
    })
  },

  findById: function(id, callback) {
    Project.findById(id, function(err, project) {
      if (err) {
        callback(err, null)
        return
      }

      callback(null, project)
    })
  },

  create: function(params, callback) {
    Project.create(params, function(err, project) {
      if (err) {
        callback(err, null)
        return
      }

      callback(null, project)
    })
  },

  update: function(id, params, callback) {
    Project.findByIdAndUpdate(id, params, {new:true},function(err, project) {
      if (err) {
        callback(err, null)
        return
      }

      callback(null, project)
    })
  },

  delete: function(id, callback) {
    Project.findByIdAndRemove(id, function(err) {
      if (err) {
        callback(err)
        return
      }

      callback(null)
    })
  }
}