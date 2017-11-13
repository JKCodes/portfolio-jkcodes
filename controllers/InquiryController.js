var Inquiry = require('../models/Inquiry')

module.exports = {
  find: function(params, callback) {
    Inquiry.find(params, function(err, inquiries) {
      if (err) {
        callback(err, null)
        return
      }

      callback(null, inquiries)
    })
  },

  findById: function(id, callback) {
    Inquiry.findById(id, function(err, inquiry) {
      if (err) {
        callback(err, null)
        return
      }

      callback(null, inquiry)
    })
  },

  create: function(params, callback) {
    Inquiry.create(params, function(err, inquiry) {
      if (err) {
        callback(err, null)
        return
      }

      callback(null, inquiry)
    })
  },

  update: function(id, params, callback) {
    Inquiry.findByIdAndUpdate(id, params, {new:true},function(err, inquiry) {
      if (err) {
        callback(err, null)
        return
      }

      callback(null, inquiry)
    })
  },

  delete: function(id, callback) {
    Inquiry.findByIdAndRemove(id, function(err) {
      if (err) {
        callback(err)
        return
      }

      callback(null)
    })
  }
}