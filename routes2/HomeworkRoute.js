import express from 'express';
const HomeworkRouter = express.Router();
import HomeworkController from '../Controllers/Homework.js';
import multer from 'multer';



let storage = multer.diskStorage({
    destination: (req,file,cb)=>
    {
        // Ensure the directory exists, and if not, create it
        const uploadDir = `CoursesCovers/`;
        if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null,uploadDir);
    },
    filename:(req,file,cb)=>
    {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

let Upload = multer({storage:storage});
HomeworkRouter.post('/Add',Upload.single("CovarImage"),HomeworkController.CreateHomework);




HomeworkRouter.get('/GetAllHomeworks/:UserID',HomeworkController.GetAllUserHomeworks);
HomeworkRouter.get('/GetUpcomingHomeworks/:UserID',HomeworkController.GetUpcomingHomeworks);
HomeworkRouter.get('/SearchHomeworks',HomeworkController.SearchHomeworksByDueDate);



export default HomeworkRouter;