const router = require('express').Router();
const mgs = require('../media/messages');
const csrfMiddleware = require('../middleware/csurf');
const Message = require('../models/messages');
const Contact = require('../models/contact');
const nodemailer = require('nodemailer');
const sanitizer = require('../middleware/sanitizer');





router.get('/', csrfMiddleware, (req, res) => {
    res.render('index', {
        messages: mgs,
        title: process.env.OWNER,
        csrf: req.csrfToken()
    });
});

// POST new visitor message
router.post('/', csrfMiddleware, (req, res) => {
    let sanitized = sanitizer.sanitizeBody(req)
    Contact.findOrCreate({where: { email: sanitized.email }, defaults: { name: sanitized.name, phone: sanitized.phone, user_id: 1 }})
    .then((user)=>{
        Message.create({ content: sanitized.content, contact_id:  user[0].dataValues['id'] })
        .then((createdMessage) => {
            res.redirect('/cv');
        })
    }).catch(e => {
        console.error(e);
        res.redirect('/')
    })
});

module.exports = router