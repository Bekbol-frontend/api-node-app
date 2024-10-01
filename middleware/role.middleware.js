function roleMiddleware(req, res, next) {
  const role = req.user.role;

  if (role !== "admin") {
    return res.status(401).send("Siz Admin emesiz!");
  }

  next();
}

module.exports = roleMiddleware;
