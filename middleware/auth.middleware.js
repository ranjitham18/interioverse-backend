// code runs runs b/w req and res
// protects routes, read cookies, verifies jwt cookies( signed token)
// middleware run before controller
//auth middleware verifies JWT from HTTP-only cookies, decodes user data, and protects routes by attaching user info to the request

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //checks token integrity 
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};


