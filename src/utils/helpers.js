
// Creación de TOKEN
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const data = {
        user_id: user.id,
    }
    return jwt.sign(data, 'LlaveSuperSecreta')
};

module.exports = {
    createToken
}