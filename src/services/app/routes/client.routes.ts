import { Router } from 'express';
import ClientController from '../controllers/client.controller';

const clientsRouter = Router();

export const API_PATH = "/api/clients";

const clientsController = new ClientController();
clientsRouter.post(API_PATH, clientsController.createBook);
clientsRouter.get(API_PATH, clientsController.getAll);
clientsRouter.get(API_PATH + "/:search", clientsController.getBooksByString);
clientsRouter.put(API_PATH + "/:isbn", clientsController.updateBook);
clientsRouter.delete(API_PATH + "/:isbn", clientsController.deleteBook);

export default clientsRouter;