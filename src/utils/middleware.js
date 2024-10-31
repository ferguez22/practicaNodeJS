
const jwt = require('jsonwebtoken');
const { selectUserById } = require('../models/user.model');

const checkToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({
            message: 'Es necesario incluir el token de autenticación'
        })
    }
    const token = req.headers['authorization']
    let data
    try {
        data = jwt.verify(token, 'LlaveSuperSecreta')
    } catch (error) {
        return res.status(403).json({
            message: 'El token es incorrecto'
        })
    }
    const user = await selectUserById(data.user_id)
    if (!user) {
        return res.status(403).json({ message: 'El usuario no existe' })
    }
    req.user = user
    next()
}

module.exports = {
    checkToken
}
