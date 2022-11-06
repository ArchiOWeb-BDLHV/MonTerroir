import express from "express";
import createError from "http-errors";
import logger from "morgan";

// Indique nos différentes routes URL
import authRouter from "./routes/auth.js";
import categoriesRouter from "./routes/categories.js";
import conversationsRouter from "./routes/conversations.js";
import indexRouter from "./routes/index.js";
import messagesRouter from "./routes/messages.js";
import productsRouter from "./routes/products.js";
import reviewsRouter from "./routes/reviews.js";
import usersRouter from "./routes/users.js";
//Controllers
import { authenticated } from "./app/http/middlewares/AuthMiddleware.js";

// Permet de se connecter à la base de données
import mongoose from "mongoose";
import config from "./config.js";

mongoose.Promise = Promise;
// Où est stockée la base de données
mongoose.connect(config.db.connection);

const app = express();

if (process.env.NODE_ENV !== "test") {
    app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//check if user is authenticated

// Indique nos différentes routes URL
app.use("/", indexRouter);
app.use("/auth", authRouter);

app.use("/users", authenticated, usersRouter); // on chaine les middlewares pour vérifier si l'utilisateur est authentifié
app.use("/products", authenticated, productsRouter);
app.use("/messages", authenticated, messagesRouter);
app.use("/reviews", authenticated, reviewsRouter);
app.use("/categories", authenticated, categoriesRouter);
app.use("/conversations", authenticated, conversationsRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Send the error status
    res.status(err.status || 500);
    res.json({ "message": err.message });
});

export default app;