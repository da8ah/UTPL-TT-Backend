import { Router } from 'express';
import passport from 'passport';
import ClientController from '../controllers/client.controller';
import TransactionsController from '../controllers/transactions.controller';

const clientRouter = Router();
const clientController = new ClientController();
const transactionsController = new TransactionsController();

export const API_PATH = "/api/clients";

// Actualizar Client
clientRouter.put(API_PATH + "/:user",
    passport.authenticate('jwt', { session: false, failureRedirect: "/signin" }),
    clientController.updateClient);
// Eliminar Client
clientRouter.delete(API_PATH + "/:user",
    passport.authenticate('jwt', { session: false, failureRedirect: "/signin" }),
    clientController.deleteClient);
// Registrar Transaction
clientRouter.post(API_PATH + "/transactions",
    passport.authenticate('jwt', { session: false, failureRedirect: "/signin" }),
    transactionsController.createCardTransaction);
// Traer todas las Transaction de un Client
clientRouter.get(API_PATH + "/transactions/:user",
    passport.authenticate('jwt', { session: false, failureRedirect: "/signin" }),
    transactionsController.retrieveTransacions);

export default clientRouter;