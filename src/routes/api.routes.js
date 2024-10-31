
//  URL BASE = /api  //
const router = require("express").Router();

router.use('/users', require('./api/users.routes'))
router.use('/events', require('./api/events.routes'))

module.exports = router;

