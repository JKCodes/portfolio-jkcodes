var Project = require('../models/Project')

function parseProjectParam(params) {
  var tools = params.tools
  var functionalities = params.functionalities
  params['tools'] = tools.split(',').map((tool) => tool.trim())
  params['functionalities'] = functionalities.split(',').map((functionality) => functionality.trim())

  return params
}

module.exports = {
  find: function(params, callback) {
    Project.find(params, null, {sort: {timestamp: -1}}, function(err, projects) {
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
    params = parseProjectParam(params)
    Project.create(params, function(err, project) {
      if (err) {
        callback(err, null)
        return
      }

      callback(null, project)
    })
  },

  update: function(id, params, callback) {
    params = parseProjectParam(params)
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