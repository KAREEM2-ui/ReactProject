import express from 'express';
const TaskRouter = express.Router();
import TaskController from '../Controllers/Task.js';



TaskRouter.post('/CreateTask',TaskController.CreateNewTask);
TaskRouter.post('/CreateNewSubTask',TaskController.CreateNewSubTask);
TaskRouter.put('/EditSubTask',TaskController.EditSubTask);
TaskRouter.post('/MarkCompletePrivateSubTask',TaskController.MarkPrivateSubTaskAsCompleted);
TaskRouter.post('/MarkCompleteSharedSubTask',TaskController.MarkSharedSubTaskAsCompleted);
TaskRouter.get('/Search',TaskController.TaskSearch);
TaskRouter.get('/UpcomingTasks/:id',TaskController.GetUpcomingTasks);
TaskRouter.post('/AssignUserToSubTask',TaskController.AssignUserToSubTask);
TaskRouter.get('/',TaskController.GetAllTasks);








TaskRouter.get("/JustTry",TaskController.JustTry);

export default TaskRouter;