import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = asyncHandler(async (req, res, next) => {
  // Debug logging to see what cookies are available
  console.log("=== AUTH MIDDLEWARE DEBUG ===");
  console.log("Request URL:", req.url);
  console.log("Request method:", req.method);
  console.log("Available cookies:", req.cookies);

  // Check for both token and authToken cookies
  let token = req.cookies.token || req.cookies.authToken;

  console.log("Token found:", !!token);
  console.log("Auth token found:", !!req.cookies.authToken);
  console.log("Regular token found:", !!req.cookies.token);

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token verified successfully, userId:", decodedToken.userId);

      const resp = await User.findById(decodedToken.userId).select(
        "isAdmin email"
      );

      if (!resp) {
        console.log("User not found for token ID:", decodedToken.userId);
        return res
          .status(401)
          .json({ status: false, message: "User not found. Try login again." });
      }

      req.user = {
        email: resp.email,
        isAdmin: resp.isAdmin,
        userId: decodedToken.userId,
      };

      console.log("User authenticated successfully:", req.user.email);
      console.log("=== END AUTH MIDDLEWARE DEBUG ===");
      next();
    } catch (error) {
      console.error("Auth error:", error.message);
      console.log("=== END AUTH MIDDLEWARE DEBUG ===");
      return res
        .status(401)
        .json({ status: false, message: "Not authorized. Try login again." });
    }
  } else {
    console.log("No authentication token found in cookies");
    console.log("=== END AUTH MIDDLEWARE DEBUG ===");
    return res
      .status(401)
      .json({ status: false, message: "Not authorized. Try login again." });
  }
});

const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try login as admin.",
    });
  }
};

export { isAdminRoute, protectRoute };
