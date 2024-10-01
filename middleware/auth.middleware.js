const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send("Siz register qilmadins!");
  }

  try {
    const checkToken = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = checkToken;
    next();
  } catch (error) {
    res.status(403).send("Jaraqsiz token!");
  }
}

module.exports = authMiddleware;
