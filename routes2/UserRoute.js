import express from 'express';
const UserRouter = express.Router();
import UserController from '../Controllers/User.js';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

UserRouter.get('/Search',UserController.FindUsers);




let storage = multer.diskStorage({
    destination: (req,file,cb)=>
    {
        // Ensure the directory exists, and if not, create it
        const uploadDir = `Profiles/`;
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
UserRouter.post('/add',Upload.single("Avatar"),UserController.CreateUser);



UserRouter.put('/update/:id',UserController.UpdateUser);
UserRouter.delete('/delete',UserController.DeleteUser);



export default UserRouter;