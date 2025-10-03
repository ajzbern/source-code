// export const API_URL =
//   process.env.NEXT_PUBLIC_API_URL || "https://api.taskpilot.xyz/api/v1";
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const getAuthHeaders = () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-api-key": "thisisasdca",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;

  const headers = {
    ...getAuthHeaders(),
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
    // credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}
