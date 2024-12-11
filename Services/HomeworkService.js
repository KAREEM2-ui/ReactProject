import HomeworkModal from '../Models/HomeworkModal.js';


export default class HomeworkService {
    static async CreateHomework(HomeworkDetails)
    {
        try
        {
            let NewHomeWork = new HomeworkModal({...HomeworkDetails});

            await NewHomeWork.save();
            return NewHomeWork;
        }
        catch(e)
        {
            throw e;    
        }
    }

    static async GetAllUserHomeworks(UserID)
    {
        try
        {
            let Homeworks = await HomeworkModal.find({CreatedBy:UserID});

            return Homeworks;
        }
        catch(e)
        {
            throw e;
        }
    }

    static async GetUpcomingHomeworks(UserID)
    {
        let currentDate = new Date();
        let FutureDate = new Date();
        FutureDate.setMonth(currentDate.getMonth() + 1); 
        
        try
        {
            let Homeworks = await HomeworkModal.find({CreatedBy:UserID,DueDate:{$lt:FutureDate},Status:"InProgress"});
            return Homeworks;
        }
        catch(e)
        {
            throw e;
        }
        

    }

    static async SearchHomeworksByDueDate(UserID,DueDate)
    {
        try
        {
            let Homeworks = await HomeworkModal.find({UserID,DueDate,Status:"InProgress"});

            return Homeworks;
        }
        catch(e)
        {
            throw e;
        }
    }
}