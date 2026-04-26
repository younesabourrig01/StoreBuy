require("dotenv").config();
module.exports = (req, res, next) => {
  const secret = req.headers["x-internal-secret"];

  if (!secret || secret !== process.env.INTERNAL_SECRET) {
    return res.status(403).json({
      success: false,
      message: "Forbidden - Direct access not allowed",
    });
  }

  next();
};
