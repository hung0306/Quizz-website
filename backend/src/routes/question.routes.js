import { Router } from "express";
import { listQuestions } from "../controllers/question.controller.js";

const router = Router();

router.get("/", listQuestions);

export default router;


