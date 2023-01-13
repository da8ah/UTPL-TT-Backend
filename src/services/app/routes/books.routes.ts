import { Router } from 'express';
import BooksController from '../controllers/books.controller';

const booksRouter = Router();

export const API_PATH = "/api/books";

const booksController = new BooksController();
booksRouter.post(API_PATH, booksController.createBook);
booksRouter.get(API_PATH, booksController.getAll);
booksRouter.get(API_PATH + "/:search", booksController.getBooksByString);
booksRouter.put(API_PATH + "/:isbn", booksController.updateBook);
booksRouter.delete(API_PATH + "/:isbn", booksController.deleteBook);

export default booksRouter;