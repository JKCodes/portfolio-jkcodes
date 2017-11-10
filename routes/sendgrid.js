var express = require('express')
var router = express.Router()
var sendgrid = require('sendgrid')

var helper = require('sendgrid').mail;
var from_email = new helper.Email('josephkim0224@gmail.com');
var to_email = new helper.Email('josephkim0224@gmail.com');
var subject = 'Hello World from the SendGrid Node.js Library!';
var content = new helper.Content('text/plain', 'Hello, Email!');
var mail = new helper.Mail(from_email, subject, to_email, content);

router.get('/', function(req, res, next) {

  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  
    if (error) {
      res.json({
        confirmation: 'fail',
        message: error
      })

      return
    }

    res.json({
      confirmation: 'success',
      response: response.body
    })

    return
  });

})

module.exports = router;
