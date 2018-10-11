const router = require('express').Router()


router.get('/admin', (req, res)=>{
    res.render('adminLogin')
})

module.exports = router