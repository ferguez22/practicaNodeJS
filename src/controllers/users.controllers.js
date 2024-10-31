
const bcrypt = require("bcryptjs")
const { createToken } = require('../utils/helpers')
const { selectAllUsers, insertUser, selectUserById, selectUserByUserName } = require("../models/user.model");

const getUsers = async (req, res, next) => {
    try {
        const result = await selectAllUsers();
        res.json(result);
    } catch (error) {
        next(error)
    }
}

const getUserById = async (req, res, next) => {
    const { userId } = req.params
    try {
        const user = await selectUserById(userId)
        res.json(user)
    } catch (error) {
        next(error)
    }
}

const registerUser = async (req, res, next) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    try {
        const result = await insertUser(req.body)
        const user = await selectUserById(result)
        res.json(user)
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    const { username, password } = req.body
    try {
        const user = await selectUserByUserName(username)
        if (!user) {
            return res.status(401).json({ message: 'Usuario incorrecto' })
        }
        const iguales = bcrypt.compareSync(password, user.password)
        if (!iguales) {
            return res.status(401).json({ message: 'Contraseña incorrecto' })
        }
        res.json({
            message: '🎉 ¡Login super exitoso te amo Sara! 🎉',
            token: createToken(user)
        })
    } catch (error) {
        next(error)
    }
}

const getPerfil = async (req, res, next) => {
    try {
        const result = await selectUserById(req.user.id)
        res.json({
            message: "Datos del perfil recuperados correctamente",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUsers,
    registerUser,
    loginUser,
    getPerfil,
    getUserById
}