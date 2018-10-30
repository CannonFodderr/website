const env = require('dotenv').config();
const passport  = require('passport');
const User            = require('../models/user');
const LocalStrategy   = require('passport-local').Strategy;
const GoogleStrategy  = require('passport-google-oauth20');
const bcrypt          = require('bcrypt');


// LOCAL STRATEGY
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({
            where: {
                'username': username
            }
        })
        .then((user) => {
            if (user == null) {
                return done(null, false, {
                    message: 'Invalid Username'
                });
            }
            let hashedPassword = bcrypt.hashSync(password, user.salt);
            if (hashedPassword == user.password) {
                return done(null, user);
            }
            
            return done(null, false, {
                message: 'Authentication failed!'
            });
        })
    }
));
    
// GOOGLE OAUTH20 - ADMIN
let cbURL;
if(process.env.DB_STATE === 'prod'){
    cbURL = process.env.PROD_HOST
} else {
    cbURL = "http://localhost:8080"
}

let googleLoginConfig = {
    clientID: process.env.OAUTH_ID,
    clientSecret: process.env.OAUTH_SECRET,
    callbackURL: `${cbURL}/login/google/callback`
}


// LOGIN
passport.use( new GoogleStrategy(googleLoginConfig,
function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile)
    }
));