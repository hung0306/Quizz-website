import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db.js";
import api from "./routes/index.js";
import { createAnswerSheet } from "./controllers/answer.controller.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// Debug incoming requests to trace 404 issues
app.use((req, _res, next) => {
  console.log(`[REQ] ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Quizz";

// Health
app.get("/health", (_req, res) => res.json({ ok: true }));

// Mount API routers
app.use("/", api);

// Fallback direct route mapping (debug): ensure POST /answers is available
app.post("/answers", createAnswerSheet);

// 404 catcher to see what path is being requested
app.use((req, res) => {
  console.warn(`[404] ${req.method} ${req.url}`);
  return res.status(404).json({ message: "Not Found", path: req.url, method: req.method });
});

async function start() {
  try {
    await connectToDatabase(MONGODB_URI);
    app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

start();


