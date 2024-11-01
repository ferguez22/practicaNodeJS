const pool = require("../config/DB");

//  Select all events
const selectAllEvents = async () => {
    const result = await pool.query("SELECT * FROM events");
    if (result.length === 0) return null;
    return result[0];
}

//  Select event by id
const selectEventById = async (eventId) => {
    const result = await pool.query('SELECT * FROM events WHERE id = ?', [eventId]);
    if (result.length === 0) return null;
    return result[0];
}

//  Insert event
const insertEvent = async ({ nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador }) => {
    const [result] = await pool.query(
        'INSERT INTO events (nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador]
    );
    if (result.affectedRows === 0) {
        return -1;
    }
    return result.insertId;
}

//  Update event by id
const updateEventById = async ({ id, nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador }) => {
    const [result] = await pool.query(
        'UPDATE events SET nombre=?, descripcion=?, fecha=?, ubicacion=?, tipoDeporte=?, organizador=? WHERE id=?',
        [nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador, id]
    );
    return result;
}

//  Delete event by id
const deleteEventById = async (eventId) => {
    const [result] = await pool.query('DELETE FROM events WHERE id = ?', [eventId]);
    return result;
}

//////// Consulta Avanzada de Eventos ////////

//  Select upcoming events
const selectUpcomingEvents = async () => {
    const [result] = await pool.query('SELECT * FROM events WHERE fecha >= CURDATE() ORDER BY fecha ASC');
    return result;
}

//  Select events by type
const selectEventsByType = async (type) => {
    const [result] = await pool.query('SELECT * FROM events WHERE tipoDeporte = ?', [type]);
    return result;
}

//  Select events by date
const selectEventsByDate = async (from, to) => {
    const [result] = await pool.query('SELECT * FROM events WHERE fecha BETWEEN ? AND ?', [from, to]);
    return result;
}

module.exports = {
    selectAllEvents,
    selectEventById,
    insertEvent,
    updateEventById,
    deleteEventById,
    selectUpcomingEvents,
    selectEventsByType,
    selectEventsByDate
}   