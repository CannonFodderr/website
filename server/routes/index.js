const router = require('express').Router();
const messages = require('../media/messages');

router.get('/', (req, res)=>{
    res.render('index', {messages:messages});
})
module.exports = router
