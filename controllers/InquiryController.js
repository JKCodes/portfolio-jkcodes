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

      // send an email
      var helper = require('sendgrid').mail
      var from_email = new helper.Email(params.email)
      var to_email = new helper.Email(process.env.SENDGRID_DEFAULT_EMAIL)
      var subject = params.subject
      var content = new helper.Content('text/plain', params.message)
      var mail = new helper.Mail(from_email, subject, to_email, content)

      var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)
      var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
      })

      sg.API(request, function(error, response) {
        console.log(response)
        if (error) {
          callback(error)
          return
        }

        callback(null)
      })
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