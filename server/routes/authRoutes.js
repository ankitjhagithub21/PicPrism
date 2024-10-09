const express = require('express')
const { login, signup, logout, getUser } = require('../controllers/authControllers')
const verifyToken = require('../middlewares/verifyToken')
const authRouter = express.Router()


authRouter.post("/login",login)
authRouter.post("/signup",signup)
authRouter.get("/logout",logout)
authRouter.get("/user",verifyToken,getUser)

module.exports = authRouter