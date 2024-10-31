//  URL BASE = /api/events  //

const router = require("express").Router();
const { checkToken } = require("../../utils/middleware.js");
const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } = require("../../controllers/events.controllers.js");

router.get('/', getAllEvents)
router.post('/', checkToken, createEvent)

router.get('/:eventId', getEventById)
router.put('/:eventId', checkToken, updateEvent)
router.delete('/:eventId', checkToken, deleteEvent)

module.exports = router;
