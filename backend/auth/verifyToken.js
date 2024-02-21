const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const secretKey =
      process.env.JWT_SECRET_KEY || crypto.randomBytes(32).toString("hex");
    var temp = token;
    var x = temp.substring(7);
    const decoded = jwt.verify(x, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
