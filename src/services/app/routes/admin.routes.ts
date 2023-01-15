import { Router } from 'express';
import AdminController from '../controllers/admin.controller';

const adminsRouter = Router();

export const API_PATH = "/api/clients";

const clientsController = new AdminController();
adminsRouter.post(API_PATH, clientsController.createAdmin);
adminsRouter.put(API_PATH + "/:isbn", clientsController.updateAdmin);
adminsRouter.delete(API_PATH + "/:isbn", clientsController.deleteAdmin);

export default adminsRouter;