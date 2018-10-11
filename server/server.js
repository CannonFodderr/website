require('dotenv').load();

const   express = require('express'),
        path = require('path'),
        port = process.env.PORT,
        bodyParser = require('body-parser'),
        methodOverride = require('method-override'),
        expressSession = require('express-session'),
        passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        User = require('./models/user'),
        bcrypt = require('bcrypt'),
        app = express();

const sq = require('./db/connect');

// IMPORT ROUTES
const   indexRoute = require('./routes/index'),
        adminRoutes = require('./routes/auth');

// APP CONFIG
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(expressSession({ secret: process.env.SECRET, resave: true, saveUninitialized: true }));

// Auth
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
    function(username, password, done){
        User.findOne({where: { 'username': username }})
        .then((user)=>{
            if (user == null){
                return done(null, false, { message: 'Invalid Username'});
            }
            let hashedPassword = bcrypt.hashSync(password, user.salt);
            if (hashedPassword == user.password) {
                return done(null, user);
            }

            return done(null, false, { message: 'Authentication failed!'});
        })
    }
))
passport.serializeUser((function(user, done) { done(null, user) }));
passport.deserializeUser(( function(user, done) { done(null, user) }));
// USE ROUTES
app.use(indexRoute);
app.use(adminRoutes);

// Seed DB
// require('./seed');

// Run Server
app.listen(port, ()=>{ console.log(`Server is running on port: ${port}`)});