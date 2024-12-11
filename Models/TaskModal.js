import mongoose, { mongo } from "mongoose";
import ProfileModal from "../Models/ProfileModal.js";


const TaskSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Desciption: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    enum:["Private","Shared"],
    required: true
  },
  CourseID: {
    type: String,
    required: false
  },
 
  Status : {
    type:String,
    required:true,
    enum:["InProgress","Completed"],
    default:"InProgress"
  }
  ,
  CovarImage:
  {
    type:String,
    required:false
  },
  DueDate:
  {
    type:Date,
    required:true
  },
  CreatedBy:
  {
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"ProfileModal"
  }
});

const TaskModal = mongoose.model("tasks",TaskSchema);
export default TaskModal;