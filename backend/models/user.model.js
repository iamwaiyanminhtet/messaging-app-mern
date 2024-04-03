import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname : {
        type : String,
        require : true
    },
    username : {
        type : String,
        require : true 
    },
    password : {
        type : String, 
        require : true 
    },
    gender : {
        type : String,
        require : true,
        enum : ['male', 'female']
    },
    profilePic : {
        type : String,
    },
    friends : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            default : []
        }
    ],
    friendRequests : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            default : []
        }
    ]
}, { timestamps : true });

const User = mongoose.model("User", userSchema);
export default User;