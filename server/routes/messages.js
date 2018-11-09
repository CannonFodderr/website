const router = require('express').Router();
const utilities = require('../utilities/auth');
const User = require('../models/user');
const Contact = require('../models/contact');
const Message = require('../models/messages');
const csrfMiddleware = require('../utilities/csurf')
const sanitizer = require('../utilities/sanitizer');

const Sequelize = require('sequelize')
const options = Sequelize.Op;

// View User Messages
router.get('/user/:userId/messages', utilities.isOwner, (req, res)=>{
    Message.findAll({where: {destination_id: req.user.id}, include: [Contact]},{order: [['created_at', 'DESC']]})
        .then((allMessages)=>{
            res.render('./user/messages', {
                user: req.user,
                title: `My Messages`,
                messages: allMessages,
                csrf: req.csrfToken()
            });
        })
        .catch(e => {
            console.error(e);
            res.redirect('back')
        })
    });
    
    // Send Message to User
    router.post('/profile/:userId/message', csrfMiddleware, (req, res) => {
        let sanitized = sanitizer.sanitizeBody(req)
        Contact.findOrCreate({where: { email: sanitized.email }, 
            defaults: { name: sanitized.name, phone: sanitized.phone }})
            .then((newContact)=>{
                Contact.findById(newContact[0].id, {include: [User]})
                .then((foundContact)=>{
                    foundContact.addUsers(req.params.userId);
                }).then(()=>{
                    Message.create({ content: sanitized.content, contact_id:  newContact[0].id, destination_id: req.params.userId })
                    .then((createdMessage) => {
                        Contact.findById(newContact[0].id, {include: [User]})
                        .then((foundContact)=>{
                            req.flash('success', "Thanks, I'll get back to you ASAP :)");
                            res.redirect(`/profile/${req.params.userId}/cv`);
                        })
                    })
                    // Send thank you e-mail
                    // let mailTemplates = require('../mailer/templates')
                    // mailer.send(process.env.EMAIL, user[0].email, mailTemplates.thankYou.subject, mailTemplates.thankYou.body );
                })
            })
            .catch(e => {
                req.flash('failure', `Error, ${e.errors[0].path}:${e.errors[0].value}`);
                console.error(e);
                res.redirect('back')
            })
        });
        
        // DELETE Message
        router.delete('/user/:userId/messages/:msgId',utilities.isAdmin, (req, res)=>{
            Message.findById(req.params.msgId)
            .then((foundMessage)=>{
                console.log("DELETE MESSAGE", foundMessage)
                foundMessage.destroy()
                res.redirect('/admin')
            })
            .catch(e => {
                console.error(e);
                res.redirect('back')
            })
        })
        
        
        module.exports = router;