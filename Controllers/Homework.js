import HomeworkService from '../Services/HomeworkService.js';
import CustomerError from '../utilities/CustomeError.js';
import UserServices from '../Services/UserServices.js';

export default class HomeworkController {
    static async CreateHomework(req,res,next)
    {
        try
        {
            let NewHomework = await HomeworkService.CreateHomework(req.body);

            return res.status(200).json({msg:"Homework Created Successfuly",NewHomework});
        }
        catch(e)
        {
            next(e);
        }
    }

    static async GetAllUserHomeworks(req,res,next)
    {
        let UserID = req.params.UserID;

        if(!UserID)
        {
            return next(CustomerError(404,"NO UserID Provided"));
        }

    


        try
        {
            let Homeworks = await HomeworkService.GetAllUserHomeworks(UserID);
            return res.status(200).json({Homeworks});
        }
        catch(e)
        {
            return next(e);
        }

    }

    static async GetUpcomingHomeworks(req,res,next)
    {
        let UserID = req.params.UserID;

        if(! UserID)
        {
            return next(CustomerError(404,"No UserID Provided"));
        }

        try
        {
            let Homeworks = await HomeworkService.GetUpcomingHomeworks(UserID);
            return res.status(200).json({Homeworks});
        }
        catch(e)
        {
            return next(e);
        }


    }
    
    static async SearchHomeworksByDueDate(req,res,next)
    {

        if(! await UserServices.IsUsernameUsed(req.body.UserID))
        {
            return next(CustomerError(404,"User not Found"));
        }

        
        try
        {
            let Homeworks = await HomeworkService.SearchHomeworksByDueDate(req.body.UserID,req.body.DueDate);
            return res.status(200).json({Homeworks});
        }
        catch(e)
        {
            return next(e);
        }
    }


}