import { Router } from "express";
import { listAnswerSheets, getAnswerSheet, createAnswerSheet } from "../controllers/answer.controller.js";

const router = Router();

router.get("/", listAnswerSheets);
router.post("/", createAnswerSheet);
router.get("/:id", getAnswerSheet);

export default router;


