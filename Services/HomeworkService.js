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
}