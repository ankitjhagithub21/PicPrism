const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const { createPost, getAllPosts, getMyPosts } = require('../controllers/postControllers')
const postRouter = express.Router()

postRouter.post("/",verifyToken,createPost)
postRouter.get("/all",getAllPosts)
postRouter.get("/my",verifyToken,getMyPosts)

module.exports = postRouter