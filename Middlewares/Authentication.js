import CustomeError from "../utilities/CustomeError.js";


export default  function VerifyUser(req,res,next)
{
    let token = req.cookies.token;

    if(!token)
    {
        return next(CustomeError(401,"no token provided"))
    }

    jsonwebtoken.verify(token,process.env.JWT_SECRET,(error,decoded)=>
    {
        if (error)
        {
            return next(CustomeError(401,"not authorized"))
        }

        console.log(decoded);
        return res.status(200).json({meg:"Authenticated"});
    })
    
}
