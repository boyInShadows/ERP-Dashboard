export class BackendError extends Error {
    status: number;
    bodyText: string;
    constructor(status: number, bodyText: string) {
      super(`BackendError ${status}: ${bodyText}`);
      this.status = status;
      this.bodyText = bodyText;
    }
  }
  
  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`/api/backend${path}`, {
      ...init,
      headers: {
        "content-type": "application/json",
        ...(init?.headers || {}),
      },
      cache: "no-store",
    });
  
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new BackendError(res.status, text);
    }
  
    // handle empty responses
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return (await res.text()) as T;
    }
    return (await res.json()) as T;
  }
  
  export const backendGet = <T>(path: string) => request<T>(path, { method: "GET" });
  export const backendPost = <T>(path: string, data: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(data) });
  export const backendPut = <T>(path: string, data: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(data) });
  export const backendDelete = <T>(path: string) => request<T>(path, { method: "DELETE" });
  