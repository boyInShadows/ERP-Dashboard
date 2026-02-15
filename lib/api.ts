type DataSource = "mock" | "backend";

function dataSource(): DataSource {
  const v =
    process.env.NEXT_PUBLIC_DATA_SOURCE ??
    process.env.DATA_SOURCE ??
    "mock";
  return v === "backend" ? "backend" : "mock";
}

function basePrefix() {
  // Both are internal Next routes:
  // /api/mock/*  (local mock endpoints)
  // /api/backend/* (proxy to real backend)
  return dataSource() === "backend" ? "/api/backend" : "/api/mock";
}

function withLeadingSlash(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

function origin() {
  if (typeof window !== "undefined") return "";

  const fromEnv =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.APP_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  return fromEnv ?? "http://localhost:3000";
}

export class ApiError extends Error {
  status: number;
  body: string;
  constructor(status: number, body: string) {
    super(`API error ${status}`);
    this.status = status;
    this.body = body;
  }
}

async function parseJsonSafe(res: Response) {
  const text = await res.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return text; }
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${origin()}${basePrefix()}${withLeadingSlash(path)}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new ApiError(res.status, String(await parseJsonSafe(res)));
  return (await res.json()) as T;
}

export async function apiSend<T>(
  path: string,
  method: "POST" | "PATCH" | "PUT" | "DELETE",
  body?: unknown
): Promise<T> {
  const res = await fetch(`${origin()}${basePrefix()}${withLeadingSlash(path)}`, {
    method,
    cache: "no-store",
    headers: { "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!res.ok) throw new ApiError(res.status, String(await parseJsonSafe(res)));

  const parsed = await parseJsonSafe(res);
  return parsed as T;
}
