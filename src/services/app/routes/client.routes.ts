import { Router } from "express";
import passport from "passport";
import AuthController from "../controllers/auth.controller";
import ClientController from "../controllers/client.controller";
import PaymentController from "../controllers/payment.controller";
import TransactionsController from "../controllers/transactions.controller";

const clientRouter = Router();
const homeController = new AuthController();
const clientController = new ClientController();
const paymentController = new PaymentController();
const transactionsController = new TransactionsController();
const passportAuth = passport.authenticate("client", {
	session: false,
});

export const API_PATH = "/api/clients";

// Ingreso con Token
clientRouter.get(`${API_PATH}/signin`, passportAuth, homeController.getClientWithToken);
// Actualizar Client
clientRouter.put(`${API_PATH}/:user`, passportAuth, clientController.updateClient);
// Eliminar Client
clientRouter.delete(`${API_PATH}/:user`, passportAuth, clientController.deleteClient);
// Solicitar Payment Credentials
clientRouter.get(`${API_PATH}/payment`, passportAuth, paymentController.getPaymentKey);
// Registrar Payment
clientRouter.post(`${API_PATH}/payment`, passportAuth, paymentController.makePayment);
// Registrar Transaction
clientRouter.post(`${API_PATH}/transactions`, passportAuth, transactionsController.createCardTransaction);
// Traer todas las Transaction de un Client
clientRouter.get(`${API_PATH}/transactions/:user`, passportAuth, transactionsController.retrieveTransacions);

export default clientRouter;
