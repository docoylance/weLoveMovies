if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(cors());
app.use(express.json());

// routes
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

// error-handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
