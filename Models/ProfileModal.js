import mongoose from "mongoose";

const ProfileSchema = mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  Name:
  {
    type:String,
    required:true
  }
  ,
  Password: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  SemStartDate: {
    type: Date,
    required: false
  }
  ,
  weeks:{
    type:Number,
    required:false
  }
  ,
  MidTermExamDate:{
    type:Date,
    required:false
  }
  ,
  FinalExamDate:{
    type:Date,
    required:false
  },
  Avatar:
  {
    type:String,
    required:false
  },
  Status:
  {
    type:String,
    required:true,
  }

});

const ProfileModal = mongoose.model("profile",ProfileSchema);
export default ProfileModal;