import mongoose from "mongoose";

const HomeWorkSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true
  },
  CourseID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"CourseModal"
  },
  DueDate: {
    type: Date,
    required: true
  }
  ,
  CreatedBy:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"ProfileModal"
  }
  ,
  Tasks:{
    type:mongoose.Schema.Types.ObjectId,
    required:false,
    ref:"TaskModal"
  }
  
});

const HomeworkModal = mongoose.model("Homework",HomeWorkSchema);
export default HomeworkModal;