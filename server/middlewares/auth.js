
import { verify } from "jsonwebtoken";
import { JWT_KEY, requiresAuth } from "../config";
import logger from "../logger/logger";

export default function(req, res, next) {
  // if (!requiresAuth) return next();

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = verify(token, JWT_KEY);
    logger.info(decoded);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};