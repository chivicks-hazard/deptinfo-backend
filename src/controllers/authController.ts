import type { Request, Response } from "express";

const { executeQuery } = require("../controllers/dbController");

async function login(req: Request, res: Response, next: Function) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send("Missing email or password");
    }

    const query = `SELECT * FROM students WHERE email = "${email}"`;

    const [user] = await executeQuery(query);

    if (user.passwordHash === password) {
      res.status(200).json({ success: true, message: "Login Successful" });
    } else {
      res.status(400).send("Incorrect email or password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

module.exports = { login };
