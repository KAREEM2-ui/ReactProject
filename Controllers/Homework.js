import HomeworkService from '../Services/HomeworkService.js';

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
}