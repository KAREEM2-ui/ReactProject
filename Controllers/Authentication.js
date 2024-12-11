import CustomeError from '../utilities/CustomeError.js';
import jsonwebtoken from 'jsonwebtoken';
import UserService from '../Services/UserServices.js';

export default class AuthenticationController {

    static async Login(req,res,next)
    {
        const {UsernameOrEmail,Password} = req.body;

        try
        {
            let User = await UserService.FindUserByUsernameOrEmail(UsernameOrEmail);

            if(User === null)
            {
                return next(CustomeError(404,"User not Found"))
            }


            // Check Password
            if(! await bcrypt.compare(Password,User.Password))
            {
                return next(CustomeError(401,"Not Authorized to Delete"));
            }
            
            
            let token = jsonwebtoken.sign({Username:User.Username},process.env.JWT_SECRET);
            return res.status(200).cookie('token',token,{httpOnly:true});


        }
        catch(e)
        {
            return next(e)
        }



       






    }



}
