var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

router.get('/about', function(req, res, next) {
  res.render('about', null)
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
    console.log(req.body)    
  }
})

module.exports = router;
