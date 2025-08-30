import type { Request, Response } from "express";

const { executeQuery } = require("../controllers/dbController");
const { login } = require("../controllers/authController");
const express = require("express");

const router = express.Router();

router.post("/login", login);

export default router;
