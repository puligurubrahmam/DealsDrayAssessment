const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    employers:[{
        name:String,
        email:String,
        mobile:String,
        designation:String,
        gender:String,
        course:String,
        image:String,
        user:{
            type:mongoose.Schema.Types.ObjectId
        },
        createdAt: { type: Date, default: Date.now }
    }]
})
module.exports=mongoose.model("users",userSchema)