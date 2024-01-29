const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    picture:String,
    date:{
        type:Date,
        default:Date.now
    },
    videoUrl:{
        type:String,
        required:true
    },
    caption:String,
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    dislikes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    views:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    posts:[{ type: mongoose.Schema.Types.ObjectId ,ref:"post" }]
});

module.exports=mongoose.model("post",postSchema);