import express from 'express';
const HomeworkRouter = express.Router();
import HomeworkController from '../Controllers/Homework.js';


HomeworkRouter.post('/Add',HomeworkController.CreateHomework);




export default HomeworkRouter;