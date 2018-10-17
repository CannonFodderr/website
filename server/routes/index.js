const router = require('express').Router();
const mgs = require('../media/messages');
const csrfMiddleware = require('../middleware/csurf');
const Message = require('../models/messages');
const Contact = require('../models/contact');

router.get('/', csrfMiddleware, (req, res) => {
    res.render('index', {
        messages: mgs,
        csrf: req.csrfToken()
    });
});

router.post('/', csrfMiddleware, (req, res) => {
    Contact.findOrCreate({where: { email: req.body.email }, defaults: { name: req.body.name }})
    .then((user)=>{
        Message.create({ content: req.body.content, contact_id:  user[0].dataValues['id'] })
        .then((createdMessage) => {
            res.redirect('/');
        })
    }).catch(e => {
        console.error(e);
        res.redirect('/')
    })
});

module.exports = router