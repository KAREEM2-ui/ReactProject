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
  status:
  {
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    default:"InProgress"
  }
  
});

const HomeworkModal = mongoose.model("Homework",HomeWorkSchema);
export default HomeworkModal;