const { expressjwt } = require("express-jwt");

// Middleware to require JWT authentication
exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// Middleware to check for user role
exports.requireUser = (req, res, next) => {
  // Check if the JWT was successfully validated
  if (!req.auth) {
    return res.status(400).json({ error: "Unauthorized" });
  }

  // Check if the user's role is 0
  if (req.auth.role === 0) {
    // Grant access
    next();
  } else {
    // Unauthorized role
    return res.status(403).json({ error: "Forbidden" });
  }
};

// Middleware to check for admin role
exports.requireAdmin = (req, res, next) => {
  // Check if the JWT was successfully validated
  if (!req.auth) {
    return res.status(400).json({ error: "Unauthorized" });
  }

  // Check if the user's role is 1
  if (req.auth.role === 1) {
    // Grant access
    next();
  } else {
    // Unauthorized role
    return res.status(403).json({ error: "Forbidden" });
  }
};
