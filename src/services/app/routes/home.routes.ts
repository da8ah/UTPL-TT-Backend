import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import BooksController from '../controllers/books.controller';

const homeRouter = Router();
const homeController = new AuthController();

homeRouter.post("/signup", homeController.signUp);
homeRouter.post("/signin", homeController.logIn);
homeRouter.post("/logout", homeController.logOut);

const booksRouter = Router();
const booksController = new BooksController();
export const API_PATH = "/api/books";

booksRouter.get(API_PATH, booksController.getAll);
booksRouter.get(API_PATH + "/:search", booksController.getBooksByString);

export default homeRouter;