import { Router } from 'express';
import passport from 'passport';
import AdminController from '../controllers/admin.controller';
import BooksController from '../controllers/books.controller';

const adminRouter = Router();
const adminController = new AdminController();

export const API_PATH = "/api/admin";

adminRouter.post(API_PATH + "/login", adminController.logIn);
adminRouter.post(API_PATH + "/logout", adminController.logOut);
adminRouter.post(API_PATH + "/newuser",
    passport.authenticate('jwt', { session: false, failureRedirect: API_PATH + "/signin" }),
    adminController.signUp);
adminRouter.put(API_PATH + "/:user",
    passport.authenticate('jwt', { session: false, failureRedirect: '/signin' }),
    adminController.updateAdmin);
adminRouter.delete(API_PATH + "/:user",
    passport.authenticate('jwt', { session: false, failureRedirect: '/signin' }),
    adminController.deleteAdmin);

const booksRouter = Router();
const booksController = new BooksController();

booksRouter.post(API_PATH + "/books",
    passport.authenticate('jwt', { session: false, failureRedirect: '/signin' }),
    booksController.createBook);
booksRouter.put(API_PATH + "/books/:isbn",
    passport.authenticate('jwt', { session: false, failureRedirect: '/signin' }),
    booksController.updateBook);
booksRouter.delete(API_PATH + "/books/:isbn",
    passport.authenticate('jwt', { session: false, failureRedirect: '/signin' }),
    booksController.deleteBook);

export default adminRouter;