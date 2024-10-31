// EN los model van las funciones que interactuan con la base de datos y son llamadas por los controlers

const pool = require("../config/DB");

//  Select all users
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

const updateEventById = async ({ id, nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador }) => {
    const [result] = await pool.query(
        'UPDATE events SET nombre = ?, descripcion = ?, fecha = ?, ubicacion = ?, tipoDeporte = ?, organizador = ? WHERE id = ?',
        [nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador, id]
    );
    return result;
}

module.exports = {
    selectAllEvents,
    selectEventById,
    insertEvent,
    updateEventById
}   