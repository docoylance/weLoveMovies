const path = require("path");
const knex = require(path.resolve("src", "db", "connection.js"));
const reduceProperties = require(path.resolve(
  "src",
  "utils",
  "reduce-properties.js"
));
const addCritic = reduceProperties("review_id", {
  critic_id: ["critic", "critic_id"],
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
  created_at: ["critic", "created_at"],
  updated_at: ["critic", "updated_at"],
});

function read(movie_id) {
  return knex("movies").select().where({ movie_id }).first();
}

function listTheaters(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ "mt.movie_id": movieId });
}

function listReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select()
    .where({ "r.movie_id": movieId })
    .then(addCritic);
}

module.exports = { read, listTheaters, listReviews };
