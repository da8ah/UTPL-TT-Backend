import { Router } from "express";
import passport from "passport";
import AdminController from "../controllers/admin.controller";
import BooksController from "../controllers/books.controller";

const adminRouter = Router();
const adminController = new AdminController();
const passportAuth = passport.authenticate("jwt", {
	session: false,
	failureRedirect: "/signin",
});

export const API_PATH = "/api/admin";

// AUTH
adminRouter.post(`${API_PATH}/login`, adminController.logIn);
adminRouter.post(`${API_PATH}/logout`, adminController.logOut);
adminRouter.post(`${API_PATH}/newuser`, passportAuth, adminController.signUp);

// ADMIN
adminRouter.get(
	`${API_PATH}/:user`,
	adminController.roleVerification,
	passportAuth,
	adminController.getAdminWithToken,
);
adminRouter.put(
	`${API_PATH}/:user`,
	adminController.roleVerification,
	passportAuth,
	adminController.updateAdmin,
);
adminRouter.delete(
	`${API_PATH}/:user`,
	adminController.roleVerification,
	passportAuth,
	adminController.deleteAdmin,
);

const booksController = new BooksController();

// BOOKS
// Crear nuevo Book
adminRouter.post(
	`${API_PATH}/books`,
	adminController.roleVerification,
	passportAuth,
	booksController.createBook,
);
// Actualizar Book
adminRouter.put(
	`${API_PATH}/books/:isbn`,
	adminController.roleVerification,
	passportAuth,
	booksController.updateBook,
);
// Eliminar Book
adminRouter.delete(
	`${API_PATH}/books/:isbn`,
	adminController.roleVerification,
	passportAuth,
	booksController.deleteBook,
);

// TRANSACTIONS
const transactionsController = adminController;

adminRouter.get(
	`${API_PATH}/transactions`,
	adminController.roleVerification,
	passportAuth,
	transactionsController.getAllTransactions,
);

export default adminRouter;
