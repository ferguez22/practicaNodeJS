
const { selectAllEvents, selectEventById, insertEvent, updateEventById, deleteEventById, selectUpcomingEvents, selectEventsByType, selectEventsByDate } = require("../models/events.model");

//  Get all events
const getAllEvents = (async (req, res, next) => {
    try {
        const result = await selectAllEvents();
        res.json(result);
    } catch (error) {
        next(error);
    }
})

//  Get event by id
const getEventById = (async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const result = await selectEventById(eventId);
        res.json(result);
    } catch (error) {
        next(error)
    }
})

//  Create event
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

//  Update event
const updateEvent = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const result = await updateEventById({ id: eventId, ...req.body });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No se encontró el evento para actualizar' });
        }

        const updatedEvent = await selectEventById(eventId);
        res.json(updatedEvent);
    } catch (error) {
        next(error);
    }
}

//  Delete event
const deleteEvent = (async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const result = await deleteEventById(eventId);
        res.json({ message: 'El evento se borró correctamente', result });
    } catch (error) {
        next(error);
    }
})

//  Consulta Avanzada de Eventos

//  Get upcoming events
const getUpcomingEvents = async (req, res, next) => {
    try {
        const result = await selectUpcomingEvents();
        if (!result) {
            return res.status(404).json({ message: 'No se encontraron eventos próximos' });
        }
        console.log(result);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

//  Get events by type
const getEventsByType = async (req, res, next) => {
    try {
        const type = req.query.type;
        const result = await selectEventsByType(type);
        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron eventos con esa descripción' });
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

//  Get events by date
const getEventsByDate = async (req, res, next) => {
    try {
        const from = req.query.from;
        const to = req.query.to;
        const result = await selectEventsByDate(from, to);
        if (!result) {
            return res.status(404).json({ message: 'No se encontraron eventos con esa fecha' });
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getUpcomingEvents,
    getEventsByType,
    getEventsByDate
}






