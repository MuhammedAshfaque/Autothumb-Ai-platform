import express from 'express';
import {registerUser, loginUser, verifyUser, logoutUser} from '../controllers/AuthController';
import protect from '../middlewares/auth';

const AuthRouter = express.Router();

AuthRouter.post('/register',registerUser);
AuthRouter.post('/login', loginUser);
AuthRouter.post('/logout', protect, logoutUser);
AuthRouter.get('/verify', protect, verifyUser);

export default AuthRouter;
