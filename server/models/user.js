const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
       
    },
    accountType:{
        type: String,
        enum : ['buyer','seller'],
        default: 'buyer'
    },
    uploads:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"POST"
        }
    ],
    purchased:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"POST"
        }
    ],
    favourites:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"POST"
        }
    ],
    
    
})

const User = mongoose.model('User',userSchema)


module.exports = User
