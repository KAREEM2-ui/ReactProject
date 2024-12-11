import HomewordModal from '../Models/HomeworkModal.js';


export default class HomeworkService {
    static async CreateHomework(HomeworkDetails)
    {
        try
        {
            let NewHomeWork = new HomewordModal({...HomeworkDetails});

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
            let Homeworks = await HomewordModal.find({CreatedBy:UserID});

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
        FutureDate.setDate(currentDate.getDate()+30);

        
        try
        {
            let Homeworks = await HomewordModal.find({CreatedBy:UserID,DueDate:{$lt:FutureDate},Status:"InProgress"});
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
            let Homeworks = await HomewordModal.find({UserID,DueDate,Status:"InProgress"});

            return Homeworks;
        }
        catch(e)
        {
            throw e;
        }
    }
}