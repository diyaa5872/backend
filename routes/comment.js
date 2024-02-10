const mongoose=require("mongoose");

const commentSchema=mongoose.Schema({
    user: String,
    date:{
        type:Date,
        default:Date.now
    },
    comment: String
});

module.exports=mongoose.model("comment",commentSchema);