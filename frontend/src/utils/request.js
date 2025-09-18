// const API_DOMAIN = "https://quizzz-d1fx.onrender.com/";
// const API_DOMAIN = "https://quizzz-d1fx.onrender.com/";
const API_DOMAIN = "http://localhost:3000/";

export const get = async (path) => {
  const response = await fetch(API_DOMAIN + path);
  if (!response.ok) {
    throw new Error(`GET ${path} failed: ${response.status}`);
  }
  const result = await response.json();
  return result;
};

export const post = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  if (!response.ok) {
    throw new Error(`POST ${path} failed: ${response.status}`);
  }
  const result = await response.json();
  return result;
};

export const del = async (path) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`DELETE ${path} failed: ${response.status}`);
  }
  const result = await response.json();
  return result;
};

export const patch = async (path, options) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  if (!response.ok) {
    throw new Error(`PATCH ${path} failed: ${response.status}`);
  }
  const result = await response.json();
  return result;
};
