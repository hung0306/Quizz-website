import { AnswerSheet } from "../models/index.js";
import { toJsonServer, toJsonServerArray } from "./_helpers.js";

export async function listAnswerSheets(req, res) {
  try {
    const userId = Number(req.query.userId);
    const filter = {};
    if (!Number.isNaN(userId)) filter.userId = userId;
    const sheets = await AnswerSheet.find(filter).lean();
    return res.json(toJsonServerArray(sheets));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function getAnswerSheet(req, res) {
  try {
    const param = req.params.id;
    let sheet = null;
    const numericId = Number(param);
    if (!Number.isNaN(numericId)) {
      sheet = await AnswerSheet.findOne({ id: numericId }).lean();
    }
    if (!sheet) {
      sheet = await AnswerSheet.findById(param).lean();
    }
    if (!sheet) return res.status(404).json({ message: "Not found" });
    return res.json(toJsonServer(sheet));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function createAnswerSheet(req, res) {
  try {
    console.log("[HANDLER] createAnswerSheet hit", {
      path: req.url,
      method: req.method,
      headers: { "content-type": req.headers["content-type"] },
    });
    const payload = req.body || {};
    console.log("[PAYLOAD]", payload);
    // basic validation/coercion to match json-server style data
    const userId = Number(payload.userId);
    const topicId = Number(payload.topicId);
    const answers = Array.isArray(payload.answers)
      ? payload.answers.map((a) => ({
          questionId: Number(a?.questionId),
          answer: Number(a?.answer),
        }))
      : [];
    if (Number.isNaN(userId) || Number.isNaN(topicId) || answers.length === 0) {
      return res.status(400).json({ message: "Invalid payload: require userId, topicId, answers[]" });
    }
    // emulate json-server incremental id
    if (typeof payload.id !== "number") {
      const last = await AnswerSheet.findOne({}).sort({ id: -1 }).lean();
      payload.id = last?.id ? last.id + 1 : 1;
    }
    const created = await AnswerSheet.create({ id: payload.id, userId, topicId, answers });
    return res.json(toJsonServer(created.toObject()));
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}


