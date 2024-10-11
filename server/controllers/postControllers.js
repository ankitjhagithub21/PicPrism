const Post = require("../models/post")
const User = require("../models/user")


const createPost = async (req, res) => {

    if (req.accountType === "buyer") {
        return res.status(403).json({ error: "Forbidden, only sellers can post.", success: false })
    }

    const { title, author, price, image, publicId } = req.body;
    try {

        const newPost = new Post({
            title,
            author,
            price,
            image,
            publicId,
            authorId: req.userId
        })

        await newPost.save()

        await User.findByIdAndUpdate(req.userId, {
            $push: { uploads: newPost._id }
        })


        return res.status(201).json({ message: "Post created successfully.", success: true, data: newPost })


    } catch (error) {
        return res.status(500).json({ error: error.message, success: false })
    }
}

const getAllPosts = async (req, res) => {

    try {

        const posts = await Post.find({})

        if (posts.length === 0) {
            return res.status(404).json({ message: "No Post found.", success: false })
        }

        return res.status(200).json({ success: true, data: posts })


    } catch (error) {
        return res.status(500).json({ error: error.message, success: false })
    }
}


const getMyPosts = async (req, res) => {

    try {

        if (req.accountType === "buyer") {
            const {purchased} = await User.findById(req.userId).populate("purchased")

            if(!purchased){
                return res.status(404).json({ message: "No Posts found.", success: false })
            }
        }else{
            const {uploads} = await User.findById(req.userId).populate("uploads")

            if(!uploads){
                return res.status(404).json({ message: "No Posts found.", success: false })
            }
        }
      

    } catch (error) {
        return res.status(500).json({ error: error.message, success: false })
    }
}


module.exports = {
    createPost,
    getAllPosts,
    getMyPosts
}