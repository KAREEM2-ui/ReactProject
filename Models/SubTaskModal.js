import mongoose from "mongoose";
import ProfileModal from "../Models/ProfileModal.js";
import TaskModal from "../Models/TaskModal.js";

const SubTaskSchema = mongoose.Schema({
  
     Title: {
          type:String,
          required:true
      },
      Description:
      {
          type: String,
          required: true
      },
      Status:
      {
          type:String,
          enum:["Not Started","InProgress","Completed"],
          required:true
      },
      DueDate:
      {
          type:Date,
          required:true
      },
      TaskID:
      {
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"TaskModal"
      },
      CreatedBy:
      {
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"ProfileModal"
      }
  
  });


const SubTaskModal = mongoose.model("SubTask",SubTaskSchema);
export default SubTaskModal;