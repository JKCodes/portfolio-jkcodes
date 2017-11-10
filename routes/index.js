var express = require('express');
var router = express.Router();

var helper = require('sendgrid').mail;
var from_email = new helper.Email('josephkim0224@gmail.com');
var to_email = new helper.Email('josephkim0224@gmail.com');
var subject = 'Hello World from the SendGrid Node.js Library!';
var content = new helper.Content('text/plain', 'Hello, Email!');
var mail = new helper.Mail(from_email, subject, to_email, content);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

router.get('/about', function(req, res, next) {
  res.render('about', null)
})

router.get('/confirmation', function(req, res, next) {
  res.render('confirmation', null)
})

router.get('/project/:name', function(req, res, next) {
  var pages = ['podcast', 'venue', 'bookmark', 'ecommerce']
  var name = req.params.name

  if (pages.indexOf(name) == -1) {
    res.render('error', {message: "Page does not exist.  Please check your spelling."})
  }

  res.render(name, null)
})


router.post('/:action', function(req, res, next) {
  var action = req.params.action
  if (action == 'contact') {

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
    
    res.redirect('/confirmation')  
  }
})

module.exports = router;
