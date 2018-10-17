require('dotenv').load();

const   express          = require('express'),
        port            = process.env.PORT,
        bodyParser      = require('body-parser'),
        methodOverride  = require('method-override'),
        expressSession  = require('express-session'),
        passport        = require('passport'),
        User            = require('./models/user'),
        LocalStrategy   = require('passport-local').Strategy,
        bcrypt          = require('bcrypt'),
        cookieParser    = require('cookie-parser'),
        app             = express();

// CSRF MIDDELWARE
const csrfMiddleware = require('./middleware/csurf');

// DB Associations
require('./db/associate');

// IMPORT ROUTES
const   indexRoute = require('./routes/index'),
        adminRoutes = require('./routes/auth'),
        projectsRoutes = require('./routes/projects');

// APP CONFIG
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('client/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);
app.use(methodOverride('_method'));
app.use(expressSession({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));

// Auth
app.use(passport.initialize());
app.use(passport.session());
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
))
passport.serializeUser((function (user, done) {
    done(null, user)
}));
passport.deserializeUser((function (user, done) {
    done(null, user)
}));
// USE ROUTES
app.use(indexRoute);
app.use(adminRoutes);
app.use(projectsRoutes);

// Seed DB
if(process.argv[2] == 'seed'){
    require('./seed');
}

// Run Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});