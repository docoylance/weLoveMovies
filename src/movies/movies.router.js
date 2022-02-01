const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const movieIdRouter = require("./movieId/movieId.router");
const controller = require("./movies.controller");

router.use("/:movieId", movieIdRouter);

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
