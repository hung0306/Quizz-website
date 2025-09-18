import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    fullname: String,
    email: { type: String, unique: true },
    password: String,
    token: String,
  },
  { timestamps: true }
);

const topicSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    name: String,
  },
  { timestamps: true }
);

const questionSchema = new mongoose.Schema(
  {
    topicId: { type: Number, index: true },
    question: String,
    answers: [String],
    correctAnswer: Number,
    id: { type: Number, unique: true, index: true },
  },
  { timestamps: true }
);

const answerSheetSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, sparse: true },
    userId: Number,
    topicId: Number,
    answers: [
      {
        questionId: Number,
        answer: Number,
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
export const Topic = mongoose.model("Topic", topicSchema);
export const Question = mongoose.model("Question", questionSchema);
export const AnswerSheet = mongoose.model("AnswerSheet", answerSheetSchema);


