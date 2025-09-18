import fs from "fs";
import path from "path";
import url from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Import models from index by re-defining schemas to avoid server start
const userSchema = new mongoose.Schema({
  fullname: String,
  email: { type: String, unique: true },
  password: String,
  token: String,
});

const topicSchema = new mongoose.Schema({ id: { type: Number, unique: true }, name: String });
const questionSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  topicId: Number,
  question: String,
  answers: [String],
  correctAnswer: Number,
});
const answerSheetSchema = new mongoose.Schema({
  id: { type: Number, unique: true, sparse: true },
  userId: Number,
  topicId: Number,
  answers: [{ questionId: Number, answer: Number }],
});

const User = mongoose.model("User", userSchema);
const Topic = mongoose.model("Topic", topicSchema);
const Question = mongoose.model("Question", questionSchema);
const AnswerSheet = mongoose.model("AnswerSheet", answerSheetSchema);

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Quizz";
  await mongoose.connect(MONGODB_URI, { dbName: new URL(MONGODB_URI).pathname.replace(/^\//, "") || undefined });

  const dbJsonPath = path.resolve(__dirname, "../../database/database.json");
  if (!fs.existsSync(dbJsonPath)) {
    console.log("Seed source not found, skip seeding:", dbJsonPath);
    await mongoose.disconnect();
    return;
  }
  console.log("Reading:", dbJsonPath);
  const raw = fs.readFileSync(dbJsonPath, "utf-8");
  const data = JSON.parse(raw);

  console.log("Parsed JSON keys:", Object.keys(data));
  console.log(
    "Counts => user:%d topics:%d question:%d answers:%d",
    Array.isArray(data.user) ? data.user.length : 0,
    Array.isArray(data.topics) ? data.topics.length : 0,
    Array.isArray(data.question) ? data.question.length : 0,
    Array.isArray(data.answers) ? data.answers.length : 0
  );

  // Clear current collections
  await Promise.all([
    User.deleteMany({}),
    Topic.deleteMany({}),
    Question.deleteMany({}),
    AnswerSheet.deleteMany({}),
  ]);
  console.log("Cleared existing collections");

  // Insert users (preserve numeric id like json-server)
  if (Array.isArray(data.user)) {
    const seenEmails = new Set();
    let skippedNull = 0;
    let skippedDup = 0;
    const docs = [];
    for (const u of data.user) {
      const email = typeof u.email === "string" && u.email.trim() ? u.email.trim() : null;
      if (!email) {
        skippedNull++;
        continue;
      }
      if (seenEmails.has(email)) {
        skippedDup++;
        continue;
      }
      seenEmails.add(email);
      docs.push({ id: u.id, fullname: u.fullname || "", email, password: u.password || "", token: u.token || "" });
    }
    if (docs.length) await User.insertMany(docs, { ordered: false });
    console.log("Users inserted:", await User.countDocuments(), "skipped null:", skippedNull, "skipped dup:", skippedDup);
  }

  // Insert topics
  if (Array.isArray(data.topics)) {
    const docs = data.topics.map((t) => ({ id: t.id, name: t.name }));
    if (docs.length) await Topic.insertMany(docs, { ordered: false });
    console.log("Topics inserted:", await Topic.countDocuments());
  }

  // Insert questions
  if (Array.isArray(data.question)) {
    const docs = data.question.map((q) => ({ id: q.id, topicId: q.topicId, question: q.question, answers: q.answers, correctAnswer: q.correctAnswer }));
    if (docs.length) await Question.insertMany(docs, { ordered: false });
    console.log("Questions inserted:", await Question.countDocuments());
  }

  // Insert answer sheets
  if (Array.isArray(data.answers)) {
    const docs = data.answers.map((a) => ({ id: a.id, userId: a.userId, topicId: a.topicId, answers: a.answers }));
    if (docs.length) await AnswerSheet.insertMany(docs, { ordered: false });
    console.log("AnswerSheets inserted:", await AnswerSheet.countDocuments());
  }

  console.log("Seeding completed.");
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


