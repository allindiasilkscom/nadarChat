const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please Ass Post Titile"]

    },
    description:{
        type:String,
        required:[true,"Please Add Post Description"]
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Post',postSchema);