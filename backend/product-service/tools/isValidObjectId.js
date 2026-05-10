const mongoose = require("mongoose");

/**
 * Checks if a string is a valid MongoDB ObjectId
 * @param {string} id
 * @returns {boolean}
 */
exports.isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
