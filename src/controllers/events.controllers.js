// En los controlers van las funciones get, post, put, delete


const { selectAllEvents, selectEventById, insertEvent, updateEventById } = require("../models/events.model");

//  Select all events
const getAllEvents = (async (req, res, next) => {
    try {
        const result = await selectAllEvents();
        res.json(result);
    } catch (error) {
        next(error);
    }
})

//  Select event by id
const getEventById = (async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const result = await selectEventById(eventId);
        res.json(result);
    } catch (error) {
        next(error)
    }
})

const createEvent = async (req, res, next) => {
    try {
        const result = await insertEvent(req.body);
        if (result === -1) {
            return res.status(400).json({
                message: 'La inserción no se ha realizado'
            });
        }
        const event = await selectEventById(result);
        res.json(event);
    } catch (error) {
        next(error);
    }
}
const updateEvent = async (req, res, next) => {
    try {
        const result = await updateEvent(req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

const deleteEvent = (async (req, res, next) => {
    res.send('Se hace el deleteEvent')
})

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}






