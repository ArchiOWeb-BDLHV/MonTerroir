import createError from "http-errors";
import express from "express";
import logger from "morgan";

// Indique nos différentes routes URL
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";
import messagesRouter from "./routes/messages.js";
import reviewsRouter from "./routes/reviews.js";

//Permet de se connecter a la base de donée
import mongoose from "mongoose";
mongoose.Promise = Promise;
// ou est stocker la base de donée
mongoose.connect("mongodb://localhost/tesseve");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Indique nos différentes routes URL
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/messages", messagesRouter);
app.use("/reviews", reviewsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Send the error status
    res.status(err.status || 500);
    res.send(err.message);
});

export default app;