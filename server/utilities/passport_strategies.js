const env               = require('dotenv').config();
const passport          = require('passport');
const User              = require('../models/user');
const LocalStrategy     = require('passport-local').Strategy;
const GoogleStrategy    = require('passport-google-oauth20');
const FacebookStrategy  = require('passport-facebook').Strategy;
const bcrypt            = require('bcrypt');
const passwordGenerator = require('generate-password');
const encrypt = require('./bcrypt');

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
if(process.env.HOST_STATE === 'prod'){
    cbURL = process.env.PROD_HOST
} else {
    cbURL = "http://localhost:8080"
}

let googleLoginConfig = {
    clientID: process.env.OAUTH_ID,
    clientSecret: process.env.OAUTH_SECRET,
    callbackURL: `${cbURL}/login/google/callback`,
    passReqToCallback: true
}


// LOGIN CB
passport.use( new GoogleStrategy(googleLoginConfig,
function(req, accessToken, refreshToken, profile, cb) {
    // If logged user has a registered googleID
    if ( req.user ) {
        User.update({ googleId: profile.id }, {where: {id: req.user.id }})
        .then((updatedUser)=>{
            return cb(null, updatedUser)
        })
        .catch(e => {
            console.error(e);
        })
    } else {
        // Sign in with googleID
        User.find({where: { googleId: profile.id }})
        .then((foundUser)=>{
            // Create user if not found
            if(foundUser === null){
                let userAvatarArr = profile.photos[0].value.split('?');
                let userAvatar = userAvatarArr[0];
                let password = passwordGenerator.generate({
                    length: 10,
                    numbers: true,
                    uppercase: false
                })
                encrypt.hashed(password)
                .then((passData)=>{
                    username = `${profile.name.givenName}${profile.name.familyName}`
                User.create({ 
                    googleId: profile.id,
                    username: username,
                    password: passData.hashedPassword,
                    salt: passData.salt,
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName, 
                    lastName: profile.name.familyName,
                    isAdmin: false,
                    bio: profile._json.aboutMe,
                    avatar: userAvatar
                })
                .then((createdUser)=>{
                    return cb(null, createdUser);
                })
                .catch(e => { console.error(e); })
                })
                // Sign In
            } else {
                return cb(null, foundUser)
            }
        })
        .catch(e => {
            console.error(e);
        })
    } 
    }
));

// FACEBOOK

let facebookLoginConfig = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${cbURL}/login/facebook/callback`,
    enableProof: true,
    passReqToCallback: true,
    profileFields: ['id', 'displayName', 'photos', 'email']
}
passport.use(new FacebookStrategy(facebookLoginConfig, 
    (req, accessToken, refreshToken, profile, done)=>{
    console.log(profile)
    let facebookId = Number(profile.id)
    let jsonData = profile._json;
    // 
    if( req.user ){
        User.update({ facebookId: facebookId }, { where: {id: req.user.id }})
        .then((updatedUser)=>{
            return done(null, updatedUser)
        })
        .catch(e => {
            console.error(e);
        })
    } else {
        User.find({where: { facebookId: facebookId }})
        .then((foundUser)=>{
            // Create user if not found
            console.log(foundUser);
            if(foundUser === null){
                let password = passwordGenerator.generate({
                    length: 10,
                    numbers: true,
                    uppercase: false
                })
                encrypt.hashed(password)
                .then((passData)=>{
                    let username = profile.displayName.replace(" ", "");
                    let nameArr = profile.displayName.split(' ');
                    let newUser = { 
                        facebookId: facebookId,
                        username: username,
                        password: passData.hashedPassword,
                        salt: passData.salt,
                        // email: profile.emails[0].value,
                        // firstName: nameArr[0],
                        // lastName: nameArr[1],
                        isAdmin: false,
                    }
                    console.log(newUser);
                User.create(newUser)
                .then((createdUser)=>{
                    return cb(null, createdUser);
                })
                .catch(e => { console.error(e); })
                })
    } else {
        done(null, foundUser);
    }
})
.catch(e => {
    console.error(e);
})
} 
}
));