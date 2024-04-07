import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true
    },
    message : {
        type : String,
        require : true
    },
    isEdited : {
        type : Boolean,
        default : false
    }   
}, { timestamps : true });

const Message = mongoose.model('Message', messageSchema);
export default Message;