var express = require('express');
var router = express.Router();

var User = require("../models/user");

/* GET users listing. */
router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if (err) res.send(err)
    res.json(users);
  })
});

router.get('/:id', function(req, res) {
  User.find({_id: req.params.id}, function(err, user) {
    if (err) res.send(err)
    res.json(user);
  })
});

router.post('/', function(req, res) {
  var nUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  })

  nUser.save(function(err, result) {
    if (err) res.send(err)
    res.json(result);
  })
});

router.put('/:id', function(req, res) {
  User
  .where({ _id: req.params.id })
  .update({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }).exec(function(err, result) {
    if (err) res.send(err)
    res.json(result)
  })
});

router.delete('/:id', function(req, res) {
  User.deleteOne({ _id: req.params.id }, function(err, result) {
    if (err) res.send(err)
    res.json(result)
  })
});

module.exports = router;
