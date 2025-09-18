import { Topic } from "../models/index.js";
import { toJsonServer, toJsonServerArray } from "./_helpers.js";

export async function listTopics(_req, res) {
  try {
    const topics = await Topic.find({}).lean();
    return res.json(toJsonServerArray(topics));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function getTopicById(req, res) {
  try {
    const id = Number(req.params.id);
    const topic = await Topic.findOne({ id }).lean();
    if (!topic) return res.status(404).json({ message: "Not found" });
    return res.json(toJsonServer(topic));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}


