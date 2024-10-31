
const pool = require("../config/DB");

const selectAllUsers = async () => {
    const [result] = await pool.query("SELECT * FROM users");
    return result
}

const selectUserById = async (userId) => {
    const [user] = await pool.query(`select * FROM users where id = ?`, [userId])
    if (user.length === 0) return null
    return user[0]
}

const selectUserByUserName = async (username) => {
    const [result] = await pool.query('SELECT * FROM users WHERE username = ?',
        [username]
    )
    return result[0]
}

const insertUser = async ({ username, password }) => {
    const [newUser] = await pool.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, password]
    )
    return newUser.insertId
}

module.exports = {
    selectAllUsers,
    insertUser,
    selectUserById,
    selectUserByUserName
}