const routeRequest = query => async (req, res, next) => {
  const { rows } = await submitQuery(query);
  if (!rows) {
    next();
    res.sendStatus(404);
  }
  res.send(rows[0]);
};

module.exports = routeRequest;
