import { Router } from 'express';
import passport from 'passport';
import ClientController from '../controllers/client.controller';
import TransactionsController from '../controllers/transactions.controller';

const clientRouter = Router();
const clientController = new ClientController();
const transactionsController = new TransactionsController();

export const API_PATH = "/api/clients";

clientRouter.put(API_PATH + "/:user",
    passport.authenticate('jwt', { session: false, failureRedirect: "/signin" }),
    clientController.updateClient);
clientRouter.delete(API_PATH + "/:user",
    passport.authenticate('jwt', { session: false, failureRedirect: "/signin" }),
    clientController.deleteClient);
clientRouter.post(API_PATH + "/transactions",
    passport.authenticate('jwt', { session: false, failureRedirect: "/signin" }),
    transactionsController.createCardTransaction);
clientRouter.get(API_PATH + "/transactions/:user",
    passport.authenticate('jwt', { session: false, failureRedirect: "/signin" }),
    transactionsController.retrieveTransacions);

export default clientRouter;