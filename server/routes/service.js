const router = require('express').Router();

// 404 route
router.get('*', (req, res)=>{ res.send('ERROR 404 file not found')})


module.exports = router;