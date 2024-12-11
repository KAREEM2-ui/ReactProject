export default function ErrorHandler (error,req,res,next)
{
    let ErrorStatus = error.status || 500;
    return res.status(ErrorStatus).json({msg:error.message});
}