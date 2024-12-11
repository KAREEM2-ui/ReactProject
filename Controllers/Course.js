import CustomeError from '../utilities/CustomeError.js';
import CourseService from '../Services/CourseService.js';

export default class CourseController {

    static async CreateCourse(req,res,next)
    {
        try
        {
            let NewCourse = await CourseService.CreateCourse(req.body);

            return res.status(200).json({msg:"Course Created Successfuly",NewCourse});
        }
        catch(e)
        {
            return next(e);
        }
    }


    static async JoinStudentsToCourse(req,res,next)
    {
        let {StudentsIDs,InviteCode} = req.body;

        if(StudentsIDs.length === 0 || !InviteCode)
        {
            return next(CustomeError(400,"Expected at least one Student and the InviteCode"));
        }
        
        try
        {
            let JoinedStudents = await CourseService.JoinStudentsToCourse(req.body.StudentsIDs,req.body.InviteCode);

            if(JoinedStudents === null)
            {
                return next(CustomeError(404,"Course is not Found"));
            }

            return res.status(200).json({msg:"Student(s) Joined Successfuly"});
        }
        catch(e)
        {
            return next(e);
        }
    }

    static async RemoveStudentFromCourse(req,res,next)
    {
        let {StudentID,CourseID} = req.body;

        if(!StudentID || !CourseID)
        {
            return next(CustomeError(400,"Expected StudentID and CourseID"));
        }


        try
        {
            let StudentRemoval = await CourseService.RemoveStudentFromCourse(req.body.StudentID,req.body.CourseID);

            console.log(StudentRemoval);
            
            if(StudentRemoval.modifiedCount === 0)
            {
                return next(CustomeError(404,"Student or Course Not Found"));
            }

            return res.status(200).json({msg:"Student Removed Successfuly"});
        }
        catch(e)
        {
            return next(e);
        }
    }


    static async GetRegisteredStudentsInCourse(req,res,next)
    {
        let CourseID = req.params.id;

        if(!CourseID)
        {
            return next(CustomeError(400,"No CourseID Provided"));
        }

        if(! await CourseService.IsCourseExist(CourseID))
        {
            return next(CustomeError(404,"Course Not Found"));
        }

        try
        {
            let RegisteredStudents = await CourseService.GetRegisteredStudentsInCourse(CourseID);

            return res.status(200).json({RegisteredStudents});
        }
        catch(e)
        {
            return next(e);
        }
    }


}