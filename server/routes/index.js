const router = require('express').Router();
const mgs = require('../media/messages');
const csrfMiddleware = require('../middleware/csurf');
const Messages = require('../models/messages');

router.get('/',csrfMiddleware, (req, res)=>{
    res.render('index', { messages:mgs, csrf: req.csrfToken()} );
})



router.post('/',csrfMiddleware, (req, res)=>{
    console.log(req.body);
    Messages.create({ author: req.body.author, email: req.body.email, content: req.body.content })
    .then(()=>{
        res.redirect('/')
    });
})

module.exports = router