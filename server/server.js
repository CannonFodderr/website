require('dotenv').load();

const   express             = require('express'),
        port                = process.env.PORT || 8080,
        bodyParser          = require('body-parser'),
        expressSanitizer    = require('express-sanitizer'),
        methodOverride      = require('method-override'),
        expressSession      = require('express-session'),
        passport            = require('passport'),
        cookieParser        = require('cookie-parser'),
        flash               = require('connect-flash');
        app                 = express();
// MULTER MIDDLEWARE
const multer = require('multer');
const upload = multer({dest: 'server/uploads/'})
// CSRF MIDDELWARE
const csrfMiddleware = require('./middleware/csurf');
const allStratgies = require('./middleware/passport_strategies');
// DB Associations
require('./db/associate');

// IMPORT ROUTES
const   indexRoute      = require('./routes/index'),
        userRoutes      = require('./routes/user'),
        projectsRoutes  = require('./routes/projects'),
        iconsRoutes     = require('./routes/icons'),
        cvRoutes        = require('./routes/cv'),
        jobsRoutes      = require('./routes/job'),
        messagesRoutes  = require('./routes/messages'),
        techRoutes      = require('./routes/tech'),
        serviceRoutes   = require('./routes/service');

// APP CONFIG
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('client/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(expressSanitizer())
app.use(cookieParser());
// app.use(upload.single('file'));
app.use(csrfMiddleware);
app.use(methodOverride('_method'));
app.use(expressSession({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));

// AUTH
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((function (user, done) {
    done(null, user)
}));
passport.deserializeUser((function (user, done) {
    done(null, user)
}));

app.use(flash());

app.use('*', (req, res, next)=>{
    res.locals.message = req.flash();
    next();
});
// USE ROUTES
app.use(indexRoute);
app.use(userRoutes);
app.use(projectsRoutes);
app.use(iconsRoutes);
app.use(cvRoutes);
app.use(jobsRoutes);
app.use(messagesRoutes);
app.use(techRoutes);
app.use(serviceRoutes);


// Seed DB
if(process.argv[2] == 'seed'){
    require('./seed');
}

// Run Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});
