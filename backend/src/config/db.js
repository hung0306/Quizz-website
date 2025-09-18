import mongoose from "mongoose";

export async function connectToDatabase(mongodbUri) {
  const uri = mongodbUri || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Quizz";
  const dbName = new URL(uri).pathname.replace(/^\//, "") || undefined;
  await mongoose.connect(uri, { dbName });
}


