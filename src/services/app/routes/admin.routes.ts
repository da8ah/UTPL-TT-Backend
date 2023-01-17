import { Router } from 'express';
import passport from 'passport';
import AdminController from '../controllers/admin.controller';

const adminsRouter = Router();

export const API_PATH = "/api/admin";

const adminsController = new AdminController();


adminsRouter.post(API_PATH + "/signup", adminsController.signUp);
adminsRouter.post(API_PATH + "/signin", adminsController.logIn);
adminsRouter.post(API_PATH + "/logout", adminsController.logOut);

// adminsRouter.post(API_PATH,
//     passport.authenticate('jwt', { session: false, failureRedirect: '/signin' }),
//     adminsController.createAdmin);

// adminsRouter.put(API_PATH + "/:isbn",
//     passport.authenticate('jwt', { session: false, failureRedirect: '/signin' }),
//     adminsController.updateAdmin);

// adminsRouter.delete(API_PATH + "/:isbn",
//     passport.authenticate('jwt', { session: false, failureRedirect: '/signin' }),
//     adminsController.deleteAdmin);

export default adminsRouter;