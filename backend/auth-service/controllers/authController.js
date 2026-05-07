const User = require("../model/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../tools/generateToken");
const {
  sendSuccess,
  sendError,
  sendNotFound,
} = require("../tools/responseHelper");

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone_number, adress, region } = req.body;
    const image = req.file ? req.file.filename : null;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, "Email already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone_number,
      adress,
      region,
      image,
    });

    return sendSuccess(
      res,
      {
        token: generateToken(user),
        user: { id: user._id, name: user.name, role: user.role },
      },
      201,
    );
  } catch (error) {
    return sendError(res, error.message);
  }
};

exports.login = async (req, res) => {
  try {
    console.log("LOGIN REQUEST RECEIVED:", req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return sendError(res, "Invalid credentials", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendError(res, "Invalid credentials", 401);

    return sendSuccess(res, {
      token: generateToken(user),
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    return sendError(res, error.message);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = req.user;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return sendError(res, "All fields are required", 400);
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return sendError(res, "Current password incorrect", 400);
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return sendSuccess(res, { message: "Password updated successfully" });
  } catch (error) {
    return sendError(res, error.message);
  }
};

exports.updateUserInfo = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return sendNotFound(res, "User");

    const { name, email, phone_number, adress, region } = req.body;
    const image = req.file ? req.file.filename : undefined;

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.phone_number = phone_number ?? user.phone_number;
    user.adress = adress ?? user.adress;
    user.region = region ?? user.region;
    user.image = image ?? user.image;

    await user.save();
    user.password = undefined;

    return sendSuccess(res, {
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    return sendError(res, error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = req.user;
    const { password } = req.body;

    if (!password) return sendError(res, "Password is required", 400);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendError(res, "Invalid password", 401);

    await user.deleteOne();

    return sendSuccess(res, { message: "User deleted successfully" });
  } catch (error) {
    return sendError(res, error.message);
  }
};

exports.userProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user)
      return sendError(res, "Unexpected error when fetching user info", 400);

    return sendSuccess(res, {
      message: "User data fetched successfully",
      user: {
        name: user.name,
        email: user.email,
        image: user.image,
        region: user.region,
        adress: user.adress,
        phone_number: user.phone_number,
      },
    });
  } catch (error) {
    return sendError(res, error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    return sendSuccess(res, { message: "Logged out successfully" });
  } catch (error) {
    return sendError(res, error.message);
  }
};
