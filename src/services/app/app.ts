import cors from "cors";
import express from "express";
import morgan from "morgan";
import passport from "passport";
import * as passportMiddleware from "./middlewares/passport";

import config from "../config/config";
import adminRouter from "./routes/admin.routes";
import clientRouter from "./routes/client.routes";
import homeRouter from "./routes/home.routes";

const app = express();

// Settings
app.set("port", config.PORT);
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use(passportMiddleware.authClient);
passport.use(passportMiddleware.authAdmin);

// Routes
app.use(homeRouter);
app.use(clientRouter);
// app.use(paymentRouter);
app.use(adminRouter);

export default app;
