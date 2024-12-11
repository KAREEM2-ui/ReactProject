import CourseModal from '../Models/CourseModal.js';

export default class CourseService {
    static async CreateCourse(CourseDetails)
    {
        try
        {
            let NewCourse = new CourseModal({...CourseDetails});

            NewCourse = await NewCourse.save();
            return NewCourse;
        }
        catch(e)
        {
            throw e;    
        }
    }

    static async JoinStudentsToCourse(StudentsIDs,InviteCode)
    {
        try
        {
            let JoinedStudents = await CourseModal.findOneAndUpdate(
                { InviteCode: InviteCode },  
                {
                    $push: {
                        Members: {$each:StudentsIDs}
                    }
                },
                {
                    new: true,  
                    projection: { Members: 1 }  
                }
            );
            return JoinedStudents;
        }
        catch(e)
        {
            throw e;
        }
    }

    static async RemoveStudentFromCourse(StudentID,CourseID)
    {
        try
        {

            let StudentRemoval = await CourseModal.updateOne(
                { _id: CourseID },  
                {
                    $pull: {
                        Members: StudentID  
                    }
                }
            );
            return StudentRemoval;

        }
        catch(e)
        {
            throw e;
        }
    }

    static async GetRegisteredStudentsInCourse(CourseID)
    {
        try
        {
            let Students = await CourseModal.findOne({_id:CourseID}).populate("Members","Name Email Avatar").select("Members");

            return Students;
        }
        catch(e)
        {
            throw e;
        }
    }
}