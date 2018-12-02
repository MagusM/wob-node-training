const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/',(req, res, next) => {
    res.render('login', {
        title: 'Login',
        message: 'Fill the form'
    });
});

router.post(
    '/',
    function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            console.log(`passport.authenticate()`);
            req.login(user, err => {
                console.log(`req login ${JSON.stringify(req.user)}`);
                res.render('login', {
                    title: 'Login',
                    message: 'POST req recieved',
                    body: JSON.stringify(user)
                }
                // next();
            );
        })(req, res, next);
        
    });
});

module.exports = router;