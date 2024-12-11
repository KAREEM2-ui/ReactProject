import express from 'express';
const LoginRouter = express.Router();
import Authentication from '../Controllers/Authentication.js';



LoginRouter.post('/',Authentication.Login);


export default LoginRouter;