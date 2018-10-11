const   express = require('express'),
        path = require('path'),
        env = require('dotenv').load(),
        port = process.env.PORT,
        bodyParser = require('body-parser'),
        methodOverride = require('method-override'),
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
app.use(express.static(path.join(__dirname, '../client/public')))

// USE ROUTES
app.use(indexRoute);
app.use(adminRoutes);

// Run Server
app.listen(port, ()=>{ console.log(`Server is running on port: ${port}`)});