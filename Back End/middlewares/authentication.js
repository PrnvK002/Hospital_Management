import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authenticationMiddleware = async (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      let token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decode.id).select("-password");

      next();
    } catch (err) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
};  
