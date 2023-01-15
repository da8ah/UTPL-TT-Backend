import { Router } from 'express';
import ClientController from '../controllers/client.controller';

const clientsRouter = Router();

export const API_PATH = "/api/clients";

const clientsController = new ClientController();
clientsRouter.post(API_PATH, clientsController.createClient);
clientsRouter.put(API_PATH + "/:user", clientsController.updateClient);
clientsRouter.delete(API_PATH + "/:user", clientsController.deleteClient);

export default clientsRouter;