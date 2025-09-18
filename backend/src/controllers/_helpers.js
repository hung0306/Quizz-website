export function toJsonServer(doc) {
  if (!doc) return doc;
  const { _id, __v, ...rest } = doc;
  return rest;
}

export function toJsonServerArray(docs) {
  return (docs || []).map((d) => toJsonServer(d));
}


