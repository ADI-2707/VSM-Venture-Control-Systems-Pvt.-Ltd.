const BASE_URL = "http://localhost:8000";

export async function apiRequest(
  endpoint: string,
  method: string = "GET",
  body?: any,
  token?: string
) {
  console.log(`API CALL → ${method} ${endpoint}`);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    console.log("API STATUS:", res.status);

    if (!res.ok) {
      const error = await res.json();
      console.error("API ERROR:", error);
      throw new Error(error.detail || "API Error");
    }

    console.log("FETCH DONE");
    const data = await res.json();
    console.log("JSON PARSED:", data);

    return data;
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("Request timeout - backend not responding");
    }

    console.error("FETCH ERROR:", err);
    throw err;
  }
}