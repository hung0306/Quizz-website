import { User } from "../models/index.js";
import { toJsonServer, toJsonServerArray } from "./_helpers.js";

export async function getUsers(req, res) {
  try {
    const { email, password } = req.query;
    const filter = {};
    if (email) filter.email = email;
    if (password) filter.password = password;
    const users = await User.find(filter).lean();
    return res.json(toJsonServerArray(users));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function createUser(req, res) {
  try {
    // emulate json-server style incremental id if not provided
    if (typeof req.body.id !== "number") {
      const last = await User.findOne({}).sort({ id: -1 }).lean();
      req.body.id = last?.id ? last.id + 1 : 1;
    }
    const created = await User.create(req.body);
    return res.json(toJsonServer(created.toObject()));
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}


