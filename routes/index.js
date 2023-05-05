const router = require('express').Router();
const es = require('./es')

router.use('/es', es)



module.exports = router;
