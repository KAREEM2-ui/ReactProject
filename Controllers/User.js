import UserServices from '../Services/UserServices.js';
import CustomeError from '../utilities/CustomeError.js';

export default class UserController {
    static async  CreateUser(req,res,next) 
    {
        
        
        try
        {
            const {Username,Password,Email,Name,Status} = req.body;
    
            if(await UserServices.IsUsernameUsed(Username))
            {
                return next(CustomeError(409,"Username Already Used"));
            }
    
            if(await UserServices.IsRegisteredEmail(Email))
            {
                return next(CustomeError(409,"Email Already Registered"));
            }
            UserServices.CreateUser(Username,Password,Email,Name,Status);
            return res.status(200).json({msg:"User Created Successfuly"});
        }
        catch(error)
        {
            return next(error)
        }




    }

    static async UpdateUser(req,res,next)
    {
        let UserID = req.params.id;

        if (!UserID)
        {
            next(CustomeError(404,"User not found"));
        }


        try
        {
            let User = await UserServices.UpdateUser(UserID,req.body);

            if(User === null)
            {
                next(CustomeError(404,"User not found"));
            }

            return res.status(200).json({msg:"User Updated Successfuly"});
        }
        catch(e)
        {
            next(e);
        }
    }

    static async DeleteUser(req,res,next)
    {
        
        try
        {
            let DeletedUser = await UserServices.DeleteUser(req.body._id,req.body.Password);

            if(DeletedUser === null)
            {
                return next(CustomeError(404,"User not Found"));
            }

            return res.status(200).json({msg:"User Deleted Successfuly"});
        }
        catch(e)
        {
            return next(e);
        }


    }


    // For Search Functionality

    static async FindUsers(req,res,next)
    {
        let Identity = req.query.Identity;

        if(!Identity)
        {
            next(CustomeError(404,"No Parameter Provided"));
        }
        try
        {
            let Users = await UserServices.FindUsers(Identity);

            

            return res.status(200).json({Users})
        }
        catch(e)
        {
            next(e);
        }
    }


    

}