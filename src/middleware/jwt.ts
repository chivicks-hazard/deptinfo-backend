// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}

function generateToken(userid: string) {
  return jwt.sign({ id: userid }, JWT_SECRET, { expiresIn: 60 * 60 });
}

function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { generateToken, verifyToken };
