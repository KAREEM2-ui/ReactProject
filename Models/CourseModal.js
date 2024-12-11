import mongoose from "mongoose";



const ClassSchema = mongoose.Schema({
    day:{
        type:String,
        required:true,
        enum:["Sunday","Monday","Tuesday","Wednesday","Thursday"]
    },
    time:{
        type:String,
        required:true
    },
    room:
    {
        type:String,
        required:true
    }
})
const CourseSchema = mongoose.Schema({
    Title: {
    type: String,
    required: true,
  },
    CovarImage: {
    type: String,
    required: false
  },
   InviteCode: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false,
    enum:["Private","Public"],
  }
  ,
  CreatedBy:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"profile"
  }
  ,
  Members:{
    type:[mongoose.Schema.Types.ObjectId],
    required:false,
    default:undefined,
    ref:"profile"
  }
  ,
  Teacher:{
    type:String,
    required:true
  },
  TimeTable:
  {
    type:[ClassSchema],
    required:false
  }
});

const CourseModal = mongoose.model("course",CourseSchema);
export default CourseModal;