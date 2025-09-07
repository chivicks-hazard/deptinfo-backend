import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "./auth";
import jwt from "jsonwebtoken";

const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/jwt");
const { executeQuery } = require("../controllers/dbController");

async function login(req: AuthRequest, res: Response, next: Function) {
  const authHeader = req.headers.authorization;
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send("Missing email or password");
    }

    const query = `SELECT * FROM students WHERE email = "${email}"`;

    const [user] = await executeQuery(query);

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (isValid) {
      const token = generateToken(user.id);
      res
        .status(200)
        .json({
          success: true,
          message: "Login Successful",
          token: token,
          user: user,
        });
    } else {
      res.status(400).send("Incorrect email or password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

async function register(req: AuthRequest, res: Response, next: NextFunction) {}

module.exports = { login };
