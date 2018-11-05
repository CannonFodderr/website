const router = require('express').Router();
const middleware = require('../middleware/auth');
const User = require('../models/user');
const Contact = require('../models/contact');
const Message = require('../models/messages');
const Sequelize = require('sequelize')
const options = Sequelize.Op;

router.get('/user/:userId/messages', middleware.isLoggedIn, (req, res)=>{
        Message.findAll({order: [['created_at', 'DESC']], 
        include: [{ model: Contact, 
            where: {user_id: req.user.id}}]})
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
})


// DELETE Message
router.delete('/user/:userId/messages/:msgId',middleware.isAdmin, (req, res)=>{
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