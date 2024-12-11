import CustomeError from '../utilities/CustomeError.js';
import TaskService, { SubTasksService } from '../Services/TaskService.js';
import SubTaskModal from '../Models/SubTaskModal.js';
import mongoose from 'mongoose';

export default class TaskController {
    static async CreateNewTask(req,res,next)
    {
        try
        {
            let NewTask = await TaskService.CreateTask(req.body);
            return res.status(200).json({msg:"Created Successfuly",NewTask})
        }
        catch(e)
        {
            next(e);
        }
    }

    static async CreateNewSubTask(req,res,next)
    {
        try
        {
            let NewSubTask = await SubTasksService.CreateNewSubTask(req.body.TaskID,req.body.SubTaskDetails);

           

            return res.status(200).json({msg:"SubTask Added Successfuly",NewSubTask});
        }
        catch(e)
        {
            next(e);
        }
    }

    static async EditSubTask(req,res,next)
    {
        let {SubTaskID,...SubTaskDetails} = req.body;

        
        try
        {
            let UpdatedSubTask = await SubTasksService.EditSubTask(SubTaskID,SubTaskDetails);

            if(UpdatedSubTask === null)
            {
                next(CustomeError(404,"SubTask is not Found"));
            }

            return res.status(200).json({msg:"Updated Successfuly",UpdatedSubTask});
        }
        catch(e)
        {
            next(e);
        }
    }


    // LATER 
    static async MarkPrivateSubTaskAsCompleted(req,res,next)
    {
        try
        {
            let CompletedSubTask = await SubTasksService.MarkPrivateSubTaskASCompleted(req.body.SubTaskID);


            if(CompletedSubTask === null)
            {
                return next(CustomeError(404,"SubTask is not Found or it is already Completed"));
            }

            // Check and Update Main Task Status if needed

            let TaskStatus = await SubTasksService.CheckAndUpdateTaskStatus(CompletedSubTask.TaskID);

            return res.status(200).json({msg:"SubTask Completed Successfuly",TaskStatus});

        }
        catch(e)
        {
            return next(e);
        }
    }

    static async MarkSharedSubTaskAsCompleted(req,res,next)
    {
        if(!req.body.AssignmentID)
        {
            return res.status(400).json({msg:"No AssignmentID Provided"});
        }


        try
        {
            let CompletedSharedSubTask = await SubTasksService
            .MarkSharedSubTaskAsCompleted(req.body.AssignmentID);
          
            if(CompletedSharedSubTask === null)
            {
                return next(CustomeError(404,"Assignment Not Found"));
            }

            let IsSubTaskCompleted = await SubTasksService.CheckAndUpdateSharedSubTaskStatus(CompletedSharedSubTask.SubTaskID._id);
            let IsTaskCompleted = false;

            if(IsSubTaskCompleted === true)
            {
                IsTaskCompleted = await SubTasksService.CheckAndUpdateTaskStatus(CompletedSharedSubTask.SubTaskID.TaskID);
            }

            return res.status(200).json({msg:"Shared SubTask Assignment Completed Successfuly",IsSubTaskCompleted,IsTaskCompleted});
        }
        catch(e)
        {
            return next(e);
        }

    }


    static async TaskSearch(req,res,next)
    {
        let {UserID,DueDate} = req.query;

        if(!UserID || !DueDate)
        {
            return next(CustomeError(400,"Expected Userid and DueDate"));
        }
        try
        {
            let SubTasks = await SubTasksService.SubTasksSearchByDueDate(UserID,DueDate);

            return res.status(200).json({SubTasks});
        }
        catch(e)
        {
            return next(e);
        }
    }


    static async GetUpcomingTasks(req,res,next)
    {
        let UserID = req.params.id;

        if(!UserID)
        {
            return next(CustomeError(404,"UserId is invalid"));
        }

        try
        {
            let SubTasks = await SubTasksService.GetUpcomingSubTasks(UserID);
 

            return res.status(200).json({SubTasks});
        }
        catch(e)
        {
            return next(e);
        }
    }



    static async AssignUserToSubTask(req,res,next)
    {
        if(!req.body.UserID || !req.body.SubTaskID)
        {
            return next(CustomeError(400,"Expected UserID and SubTaskID"));
        }

        try
        {
            let Assignment = await SubTasksService.AssignUserToSubTask(req.body.UserID,req.body.SubTaskID);
 
            return res.status(200).json({msg:"Added Successfuly",Assignment});
        }
        catch(e)
        {
            return next(e);
        }
    }

    static async GetAllTasks(req,res,next)
    {
        try
        {
            let Tasks = await TaskService.GetAllTasks();

            return res.status(200).json({Tasks});
        }
        catch(e)
        {
            return next(e);
        }
    }

























    static async JustTry(req,res,next)
    {
        try
        {
            let Task = await TaskService.CheckAndUpdateSubTaskStatus(req.body.TaskID,req.body.SubTaskID);
            return res.status(200).json({Task});
        }
        catch(e)
        {
            next(e);
        }
    }
}