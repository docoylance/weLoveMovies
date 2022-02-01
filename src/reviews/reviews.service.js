const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties.js");
const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function read(review_id) {
  return knex("reviews").select().where({ review_id }).first();
}

function update(updatedReview, review_id) {
  return knex("reviews as r")
    .update(updatedReview)
    .then(() => read(review_id));
}

function concat(updatedReview, review_id) {
  update(updatedReview, review_id);
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .then((records) => records[0])
    .then(addCritic);
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = { read, update: concat, destroy };
