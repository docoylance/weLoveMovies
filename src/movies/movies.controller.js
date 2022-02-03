const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const { is_showing = null } = req.query;
  const data = is_showing ? await service.listShowing() : await service.list();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
