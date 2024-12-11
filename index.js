import express from 'express'
import cors from 'cors'
import './db/index.js';
import dotenv from 'dotenv';
import Authentication from './Middlewares/Authentication.js';
import UserRouter from './routes2/UserRoute.js';
import TaskRouter from './routes2/TaskRoute.js';
import HomeworkRouter from './routes2/HomeworkRoute.js';
import CourseRouter from './routes2/CourseRoute.js';
import LoginRouter from './routes2/LoginRoute.js';
import ErrorHandler from './Middlewares/ErrorHandler.js';

const app = express();


app.use(cors());
app.use(express.json());
dotenv.config();
app.use('/Profiles', express.static('Profiles'));


// Authentication
//app.use(Authentication);


app.listen(3001,()=>
{
    console.log("server is connected")
})

app.use("/api/Users",UserRouter);
app.use("/api/Tasks",TaskRouter);
app.use("/api/Homeworks",HomeworkRouter);
app.use("/api/Courses",CourseRouter);
app.use("/api/Login",LoginRouter);


app.use(ErrorHandler);

