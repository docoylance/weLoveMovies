const router = require("express").Router({mergeParams: true});
const path= require("path");
const methodNotAllowed = require(path.resolve("src", "errors", "methodNotAllowed.js"));
const controller = require("./movieId.controller");

router.route("/").get(controller.read).all(methodNotAllowed);

router.route("/theaters").get(controller.listTheaters).all(methodNotAllowed);

router.route("/reviews").get(controller.listReviews).all(methodNotAllowed);

module.exports = router;
