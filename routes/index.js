var express = require('express');
var router = express.Router();
var models = require('../models/models');

router.use(function (req, res, next) {
    if (req.user) {
      next();
    } else {
      res.status(401).json({ message: 'You need to be authenticated before this works!' });
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/validate', function (req, res) {
    res.status(200).json(req.user);
});

router.post('/candidates', function (req, res) {
    (new models.CandidateModel(req.body)).save(function (err, result) {
        if (err) res.status(500).json({error: err});
        else res.status(201).json({result: result});
    });
});

module.exports = router;
