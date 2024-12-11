import mongoose from "mongoose";
import SubTaskModal from "../Models/SubTaskModal.js";
import ProfileModal from "./ProfileModal.js";

const AssignmentSchema = mongoose.Schema({
    UserID:
    {
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"profile"
    },
    Status:
    {
      type:String,
      required:true,
      enum:["InProgress","Completed"],
      default:"InProgress"
    },
    SubTaskID:
    {
      type:mongoose.Types.ObjectId,
      required:true,
      ref:"SubTask"
    }
  });



  const AssignmentModal = mongoose.model("SubTaskAssignments",AssignmentSchema);
  export default AssignmentModal;