const express = require('express');
const router = express.Router();
const userMiddleware = require('../middlewares/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:name', userMiddleware, function(req, res, next) {
  res.send(`who the hell are you ${req.params.name}`);
});

module.exports = router;
