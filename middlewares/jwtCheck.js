const jwt = require("jsonwebtoken");
const Users = require("../models/User");

// Middleware for general JWT check
exports.jwtCheck = async (req, res, next) => {
  try {
 
    const token = req.header("Authorization");
  
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
 
    const user = await Users.findOne({ where: { id: decoded.userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT check error:", error);
    res.status(401).json({ message: "Invalid token or unauthorized access" });
  }
};

// Middleware for checking premium users
exports.jwtCheckPremium = async (req, res, next) => {
  try {
    
    const token = req.header("Authorization");
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isPremium) {
      return res.status(403).json({ message: "Access restricted to premium users" });
    }

    const user = await Users.findOne({ where: { id: decoded.userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Premium user check error:", error);
    res.status(401).json({ message: "Invalid token or unauthorized access" });
  }
};
