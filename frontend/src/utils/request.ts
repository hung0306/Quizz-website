// const API_DOMAIN = "https://quizzz-d1fx.onrender.com/";
// const API_DOMAIN = "https://quizzz-d1fx.onrender.com/";
const API_DOMAIN = "http://localhost:3000/";

export const get = async (path: string): Promise<any> => {
  try {
    const response = await fetch(API_DOMAIN + path);
    if (!response.ok) {
      throw new Error(`GET ${path} failed: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    throw error;
  }
};

export const post = async (path: string, options: any): Promise<any> => {
  try {
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
  } catch (error) {
    console.error(`Error posting to ${path}:`, error);
    throw error;
  }
};

export const del = async (path: string): Promise<any> => {
  const response = await fetch(API_DOMAIN + path, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`DELETE ${path} failed: ${response.status}`);
  }
  const result = await response.json();
  return result;
};

export const patch = async (path: string, options: any): Promise<any> => {
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
