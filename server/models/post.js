const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        
    },
    author:{
        type:String,
        required:true,
       
    },
    price:{
        type:Number,
        required:true,
       
    },
    image:{
        type: String,
        required:true
    },
    publicId:{
        type: String,
        required:true
    },
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },

    purchaseBy:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
   
    
    
},{timestamps:true})

const Post = mongoose.model('post',postSchema)


module.exports = Post
