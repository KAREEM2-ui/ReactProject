import mongoose from "mongoose";
import TaskModal from "../Models/TaskModal.js";
import CustomeError from "../utilities/CustomeError.js";
import SubTaskModal from "../Models/SubTaskModal.js";
import UserServices from "./UserServices.js";
import AssignmentModal from "../Models/SubTasksAssignments.js";


export default class TaskService {

        static async CreateTask(TaskDetails)
        {
            try
            {
                let NewTask = new TaskModal({...TaskDetails});
    
                NewTask = await NewTask.save();
                return NewTask;
            }
            catch(e)
            {
                throw e;    
            }
        }

        static async IsTaskExist(TaskID)
        {
            try
            {
                let Task = await TaskModal.findOne({_id:TaskID});

                if(Task !== null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch(e)
            {
                throw e;
            }
        }
    }




export class SubTasksService {
    static async CreateNewSubTask(TaskID,SubTaskDetails)
    {
        try
        {
            // check if task exist
            if(! await  TaskService.IsTaskExist(TaskID))
            {
                throw CustomeError(404,"Task Does not Exist ");
            }


            let SubTask = new SubTaskModal({...SubTaskDetails,TaskID});
            SubTask = await SubTask.save();
            return SubTask;

        }
        catch(e)
        {
            throw e;
        }
    }


    static async IsSubTaskExist(SubTaskID)
    {
        try
            {
                let SubTask = await SubTaskModal.findOne({_id:SubTaskID});

                if(SubTask !== null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch(e)
            {
                throw e;
            }
    }


    static async EditSubTask(SubTaskID,SubTaskDetails)
    {

        try
        {
            let UpdatedSubTask = await SubTaskModal.findOneAndUpdate(
                { _id: SubTaskID },            
                { $set: SubTaskDetails  }, 
                { new: true }                   
            );

            return UpdatedSubTask;


        }
        catch(e)
        {
            throw e;
        }
       

              
    }





    static async SubTasksSearchByDueDate(UserID,SubmissionDate)
    {
        try
        {
            // find Private tasks id's
            let TasksIds = await TaskModal.find({Type:"Private",Status:"InProgress",CreatedBy:UserID},{_id:1});
            let PrivateSubTasks = await SubTaskModal.find({TaskID:{$in:TasksIds},DueDate:SubmissionDate});
            

            // find Shared SubTasksAssignments
            let Assignments = await AssignmentModal.find({UserID,Status:"InProgress"}).populate({path:"SubTaskID",as:"SubTaskDetails"});
            Assignments = Assignments.filter((Assignment)=>Assignment.SubTaskDetails.DueDate === SubmissionDate);


            return {PrivateSubTasks,SharedSubTasks:Assignments};

        }
        catch(e)
        {
            throw e;
        }


    }

    static async GetUpcomingSubTasks(UserID)
    {


        let currentDate = new Date();
        let FutureDate = new Date();
        FutureDate.setDate(currentDate.getDate()+30);

        // find Private tasks id's
        let TasksIds = await TaskModal.find({Type:"Private",Status:"InProgress",CreatedBy:UserID},{_id:1});
        let PrivateSubTasks = await SubTaskModal.find({TaskID:{$in:TasksIds},DueDate:{$lt:FutureDate}});
        

        // find Shared SubTasksAssignments
        let Assignments = await AssignmentModal.find({UserID,Status:"InProgress"}).populate({path:"SubTaskID",as:"SubTaskDetails",match: { DueDate: { $lt: FutureDate } }});
        Assignments = Assignments.filter((Assignment)=>Assignment.SubTaskDetails !== undefined);

        return {PrivateSubTasks,SharedSubTasks:Assignments};

    }


    static async AssignUserToSubTask(UserID,SubTaskID)
    {
        if(! await SubTasksService.IsSubTaskExist(SubTaskID))
        {
            throw CustomeError(404,"SubTask Does not Exist !");
        }

        try
        {
            let Assignment =  new AssignmentModal({UserID,SubTaskID});
            Assignment = await Assignment.save();
            return Assignment;
        }
        catch(e)
        {
            throw e;
        }

    }


    static async MarkPrivateSubTaskASCompleted(SubTaskID)
    {
        try
        {
            let CompletedPrivateSubTask = await SubTaskModal.findOneAndUpdate({_id:SubTaskID,Status:"InProgress"},{Status:"Completed"},{new:true});
            return CompletedPrivateSubTask;
        }
        catch(e)
        {
            throw e;
        }
    }

    static async MarkSharedSubTaskAsCompleted(AssignmentID)
    {
        try
        {
            let CompletedSharedSubTask = await AssignmentModal.findOneAndUpdate({_id:AssignmentID},{Status:"Completed"})
            .populate({path:"SubTaskID",
                      as: 'SubTaskDetails'
            });     

            return CompletedSharedSubTask;
        }
        catch(e)
        {
            throw e;
        }
    }


    static async CheckAndUpdateSharedSubTaskStatus(SubTaskID)
    {
        try
        {
            let UnfinishedSubTaskAssignments = await AssignmentModal.findOne(
                { SubTaskID, Status: "InProgress" },
                { _id: 1 } 
              );

            
            // means all finished
            if (UnfinishedSubTaskAssignments === null)
            {
                let UpdatedSubTaskStatus = await SubTaskModal.findOneAndUpdate({_id:SubTaskID},{Status:"Completed"});
                return true;
            }


            // otherwise 
            return false;
        }



        catch(e)
        {
            throw e;
        }
    }

    static async CheckAndUpdateTaskStatus(TaskID)
    {
        try
        {
            let UnfinishedSubTasks = await SubTaskModal.findOne(
                { TaskID, Status: "InProgress" },
                { _id: 1 } 
              );

            // means all finished
            if (UnfinishedSubTasks === null)
                {
                    let UpdatedTaskStatus = await TaskModal.findOneAndUpdate({_id:TaskID},{Status:"Completed"});
                    return true;
                }
            

            // otherwise
            return false;

            
        }
        catch(e)
        {
            throw e;
        }
    }

}