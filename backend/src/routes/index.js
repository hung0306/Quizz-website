import { Router } from "express";
import userRouter from "./user.routes.js";
import topicRouter from "./topic.routes.js";
import questionRouter from "./question.routes.js";
import answerRouter from "./answer.routes.js";

const api = Router();

api.use("/user", userRouter);
api.use("/topics", topicRouter);
api.use("/question", questionRouter);
api.use("/answers", answerRouter);

export default api;


