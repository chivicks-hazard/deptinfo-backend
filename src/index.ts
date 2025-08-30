// Imports
import express, { Request, Response } from "express";
import auth from "./routes/auth";

const logger = require("./middleware/logger");
const { initialisePool } = require("./controllers/dbController");
const cors = require("cors");

const app = express();
const PORT = 8000;

initialisePool().catch((error: any) => {
  console.log(error);
  process.exit(1);
});

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", auth);

app.get("/api/main", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
