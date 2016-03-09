var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../../../db/knex');
var passport = require('../lib/auth');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome!' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: "Login"});
});

router.get('/register', function(req, res, next) {
    res.render('register', { title: "Become a user"});
});

router.get('/logout', function(req, res, next) {
    res.redirect('/');
});

// ============== POSTS ================

router.post('/login', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    passport.authenticate('local', function(err, user) {
        if (err) {
            res.render('login', {title: 'Login', message: 'you did something wrong.'});
        } else {
            return res.redirect('/');
        }
    })(req, res, next);
});


router.post('/register', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    knex('users').where('email', email)
    .then(function(data) {
        if (data.length) {
            return res.render('register', {title: "register", message: "fix your shit. that email already exists"});
        } else {
            knex('users').insert({email: email, password:password})
            .then(function() {
                res.redirect('/');
            })
            .catch(function(err) {
                return next(err);
            });
        }
    })
    .catch(function(err) {
        return next(err);
    })
});

module.exports = router;
