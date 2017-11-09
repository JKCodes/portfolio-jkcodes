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
  var name = req.params.name

  res.render(name, null)
})


router.post('/:action', function(req, res, next) {
  var action = req.params.action
  if (action == 'contact') {
    console.log(req.body)    
  }
})

module.exports = router;
