//  URL BASE = /api/users  //
const { checkToken } = require("../../utils/middleware.js");
const router = require("express").Router();
const { getUsers, getPerfil, registerUser, loginUser, getUserById } = require("../../controllers/users.controllers.js");

router.get('/', getUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/perfil', checkToken, getPerfil)

router.get('/:userId', getUserById)

module.exports = router;