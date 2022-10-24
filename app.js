import createError from "http-errors";
import express from "express";
import logger from "morgan";

// Indique nos différentes routes URL
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";
import messagesRouter from "./routes/messages.js";
import reviewsRouter from "./routes/reviews.js";
import authRouter from "./routes/auth.js";
import categorysRouter from "./routes/categorys.js";

//Controllers
import { authenticated } from "./app/http/middlewares/AuthMiddleware.js";

// Permet de se connecter à la base de données
import mongoose from "mongoose";
import config from "./config.js";
import { is } from "./app/http/middlewares/AuthorizationMiddleware.js";
import { Role } from "./app/models/role.js";

mongoose.Promise = Promise;
// Où est stockée la base de données
mongoose.connect("mongodb://" + config.db.host + "/" + config.db.name);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//check if user is authenticated

// Indique nos différentes routes URL
app.use("/", indexRouter);
app.use("/auth", authRouter);

app.use("/users", authenticated, is(Role.ADMIN), usersRouter); // on chaine les middlewares pour vérifier si l'utilisateur est authentifié
app.use("/products", authenticated, productsRouter);
app.use("/messages", authenticated, messagesRouter);
app.use("/reviews", authenticated, reviewsRouter);
app.use("/categorys", authenticated, categorysRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Send the error status
    res.status(err.status || 500);
    res.json({
        message: err.message,
    });
});

export default app;