const router = require('express').Router();
const middleware = require('../middleware/auth');
const User = require('../models/user');
const Contact = require('../models/contact');
const Message = require('../models/messages');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

router.get('/admin/messages', middleware.isAdmin, (req, res)=>{
    User.find({where: {[Op.or]: [{id: Number(req.user.id)}, {googleId: req.user.id}]}}, 
    {include: ['projects']}).then((user)=>{
        Message.findAll({order: [['created_at', 'DESC']], include: [{ model: Contact }]})
        .then((allMessages)=>{
            res.render('./admin/messages', {
                user: req.user,
                title: `${ process.env.OWNER } - Control Panel`,
                messages: allMessages,
                csrf: req.csrfToken()
            });
        })
        .catch(e => {
            console.error(e);
            res.redirect('back')
        })
        
    })
})


// DELETE Message
router.delete('/admin/messages/:msgId',middleware.isAdmin, (req, res)=>{
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