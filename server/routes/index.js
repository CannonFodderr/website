const router = require('express').Router();
const messages = require('../media/messages');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const csrfMiddleware = require('../middleware/csurf');
const Messages = require('../models/messages');

router.get('/',csrfMiddleware, (req, res)=>{
    res.render('index', { messages:messages, csrf: req.csrfToken()} );
})



router.post('/',csrfMiddleware, (req, res)=>{
    console.log(req.body);
    Messages.create({ author: req.body.author, email: req.body.email, content: req.body.content })
    .then(()=>{
        res.redirect('/')
    });
})

module.exports = router