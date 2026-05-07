const User = require("../model/User");

module.exports = async (req, res, next) => {
  try {
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return next(); // Continue, but req.user will be undefined
    }

    const user = await User.findById(userId);
    if (user) {
      req.user = user;
    }
    
    next();
  } catch (error) {
    console.error("User Middleware Error:", error.message);
    next();
  }
};
