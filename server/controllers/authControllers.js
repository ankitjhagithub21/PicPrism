const User = require("../models/user")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required", success: false })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ error: "User not found.", success: false })
        }


        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return res.status(400).json({ error: "Wrong email or password.", success: false })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 24 * 60 * 60 * 1000
        })

        const data = {
            _id: user._id,
            username: user.username,
            email: user.email,
            accountType: user.accountType
        }

        return res.status(200).json({ message: "Login Successfull.", success: true, data })



    } catch (error) {
        return res.status(500).json({ error: error.message, success: false })
    }
}

const signup = async (req, res) => {
    try {

        const { username, email, password, accountType } = req.body;

        if (!email || !password || !username || !accountType) {
            return res.status(400).json({ error: "All fields are required", success: false })
        }


        const emailExist = await User.findOne({ email })

        if (emailExist) {
            return res.status(400).json({ error: "Email already exist.", success: false })
        }


        const usernameExist = await User.findOne({ username })

        if (usernameExist) {
            return res.status(400).json({ error: "Username already taken.", success: false })
        }

        //validate email

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Please enter valid email address.", success: false })
        }

        if (username.trim().length < 3) {
            return res.status(400).json({ error: "Username must be atleast 3 characters long.", success: false })
        }


        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: "Please enter strong password.", success: false })
        }

        const hashedPassword = await bcryptjs.hash(password,12)


        const newUser = new User({
            username,
            email,
            password:hashedPassword,
            accountType
        })


        await newUser.save();

        return res.status(201).json({ message: "User registered successfully.", success: true })


    } catch (error) {
        return res.status(500).json({ error: error.message, success: false })
    }
}


const logout = async (req, res) => {
    try {
        return res.status(200).cookie('token','',{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:Date.now()
        }).json({ message: "Logout successfull.", success: true })

    } catch (error) {
        return res.status(500).json({ error: error.message, success: false })
    }
}

const getUser = async (req, res) => {
    try {
        
        const user = await User.findById(req.userId).select("-password")

        if(!user){
            return res.status(401).json({ error: "Unauthorized.", success: false })
        }

        return res.status(200).json({ user, success: true })

    } catch (error) {
        return res.status(500).json({ error: error.message, success: false })
    }
}


module.exports = {
    login,
    signup,
    logout,
    getUser
}