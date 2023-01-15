import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const authRouter = Router();

const authController = new AuthController();
authRouter.post("/signup", authController.signUp);
authRouter.post("/signin", authController.logIn);
authRouter.post("/logout", authController.logOut);

export default authRouter;