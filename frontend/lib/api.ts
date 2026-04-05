import { useAuthStore } from "@/store/useAuthStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiOptions {
  method?: ApiMethod;
  body?: any;
  headers?: Record<string, string>;
  requireAuth?: boolean;
}

export async function apiFetch<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const {
    method = "GET",
    body,
    headers = {},
    requireAuth = true,
  } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    if (body instanceof FormData) {
      // Allow browser to set correct multipart headers
      // @ts-ignore
      delete config.headers["Content-Type"];
      config.body = body;
    } else {
      config.body = JSON.stringify(body);
    }
  }

  // Attach token if required
  if (requireAuth) {
    const token = useAuthStore.getState().token;
    if (token) {
      // @ts-ignore
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    let data;

    // Handle empty responses
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new Error((data as any)?.message || `Error ${response.status}: ${response.statusText}`);
    }

    return data as T;
  } catch (error: any) {
    console.error("API Error:", error);
    throw new Error(error.message || "An unexpected network error occurred.");
  }
}
