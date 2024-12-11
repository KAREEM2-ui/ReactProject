import mongoose from "mongoose";
import ProfileModal from "./ProfileModal";




const MessageSchema = mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"profile"
    },
    Date:{
        type:Date,
        required:true
    },
    SeenBy:
    {
        type:[mongoose.Schema.Types.ObjectId],
        required:true,
        ref:"profile"
    },
    Attachments:
    {
        type:String,
        required:false
    },
    Status:
    {
        type:String,
        enum:["Shown","Deleted"],
        required:true
    },
    ReplyTo:
    {
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref:"message"
    }

})
const ChatSchema = mongoose.Schema({
  
  LastMessage: {
    type: String,
    required: true
  },
  Messages:
  {
    type:[MessageSchema],
    required:true
  }
});

const ChatModal = mongoose.model("Chats",ChatSchema);
const MessageModal = mongoose.model("message",MessageSchema);
export default ChatModal;