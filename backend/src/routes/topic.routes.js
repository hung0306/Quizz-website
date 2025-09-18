import { Router } from "express";
import { listTopics, getTopicById } from "../controllers/topic.controller.js";

const router = Router();

router.get("/", listTopics);
router.get("/:id", getTopicById);

export default router;


