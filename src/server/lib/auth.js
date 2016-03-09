var passport = require('passport');
var LocalStrategy = require('passport-local');
var knex = require('../../../db/knex');

function Users() {
    return knex('users');
}

passport.use(new LocalStrategy({
    usernameField: 'email'
}, function(email, password, done) {
    Users().where('email', email)
    .then(function(data) {
        var user = data[0];
        if (!data.length) {
            return done("Incorrect email.");
        }

        if (password === user.password) {
            return done(null, user);
        } else {
            return done("Incorrect password.");
        }
    })
    .catch(function(err) {
        return done(null, false, {message: "Incorrect email and password combination."});
    });
}));

//sets the user to 'req.user' and establishes a session via a cookie
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used on subsequent requests to update 'req.user' and update session
passport.deserializeUser(function(id, done) {
    Users().where('id', id)
    .then(function(data) {
        return done(null, data[0]);
    })
    .catch(function(err) {
        return done(err);
    });
});

module.exports = passport;

