import express from 'express';
const CourseRouter = express.Router();
import CourseController from '../Controllers/Course.js';


CourseRouter.post('/Add',CourseController.CreateCourse);
CourseRouter.post('/AddStudents',CourseController.JoinStudentsToCourse);
CourseRouter.post('/RemoveStudent',CourseController.RemoveStudentFromCourse);
CourseRouter.get('/RegisteredStudents/:id',CourseController.GetRegisteredStudentsInCourse);




export default CourseRouter;