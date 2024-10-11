require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDb = require('./config/db')
const authRouter = require('./routes/authRoutes')
const postRouter = require('./routes/postRoutes')
const app = express()

const port = process.env.PORT || 3000
connectDb()


app.use(express.json())
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}))
app.use(cookieParser())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})