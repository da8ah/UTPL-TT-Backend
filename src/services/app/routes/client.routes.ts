import { Router } from "express";
import passport from "passport";
import AuthController from "../controllers/auth.controller";
import ClientController from "../controllers/client.controller";
import TransactionsController from "../controllers/transactions.controller";

const clientRouter = Router();
const homeController = new AuthController();
const clientController = new ClientController();
const transactionsController = new TransactionsController();
const passportAuth = passport.authenticate("jwt", {
	session: false,
});

export const API_PATH = "/api/clients";

// Ingreso con Token
clientRouter.get(`${API_PATH}/signin`, homeController.getClientWithToken);
// Actualizar Client
clientRouter.put(`${API_PATH}/:user`, passportAuth, clientController.updateClient);
// Eliminar Client
clientRouter.delete(`${API_PATH}/:user`, passportAuth, clientController.deleteClient);
// Registrar Transaction
clientRouter.post(`${API_PATH}/transactions`, passportAuth, transactionsController.createCardTransaction);
// Traer todas las Transaction de un Client
clientRouter.get(`${API_PATH}/transactions/:user`, passportAuth, transactionsController.retrieveTransacions);

export default clientRouter;
