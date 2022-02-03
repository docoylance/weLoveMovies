const service = require("./movieId.service");
const path = require("path");
const asyncErrorBoundary = require(path.resolve(
  "src",
  "errors",
  "asyncErrorBoundary.js"
));

// movieId validation function
async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}

async function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

async function listTheaters(req, res, next) {
  res.json({ data: await service.listTheaters(req.params.movieId) });
}

async function listReviews(req, res, next) {
  res.json({ data: await service.listReviews(req.params.movieId) });
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), read],
  listTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listTheaters),
  ],
  listReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listReviews),
  ],
};
