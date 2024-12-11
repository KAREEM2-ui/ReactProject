export default function CustomerError (status=500,message="Internal server error")
{
    let ErrorHappened =  new Error(message);
    ErrorHappened.status = status;
    return ErrorHappened;
}