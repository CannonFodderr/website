const   express = require('express'),
        path = require('path'),
        env = require('dotenv').load(),
        port = process.env.PORT,
        bodyParser = require('body-parser'),
        methodOverride = require('method-override'),
        expressSession = require('express-session'),
        passport = require('passport'),
        passLocal = require('passport-local'),
        passportLocalSequelize = require('passport-local-sequelize'),
        User = require('./models/user'),
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
app.use(expressSession({ secret: 'kornishon', resave: false, saveUninitialized: false }));

// Auth
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// USE ROUTES
app.use(indexRoute);
app.use(adminRoutes);

// Run Server
app.listen(port, ()=>{ console.log(`Server is running on port: ${port}`)});