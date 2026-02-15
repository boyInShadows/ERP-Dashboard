import { NextRequest, NextResponse } from "next/server";

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;

function buildTargetUrl(req: NextRequest, pathParts: string[]) {
  if (!BACKEND_BASE_URL) throw new Error("BACKEND_BASE_URL is not set");
  const base = BACKEND_BASE_URL.replace(/\/$/, "");
  const path = pathParts.join("/");
  const url = new URL(`${base}/${path}`);
  // forward query string
  req.nextUrl.searchParams.forEach((v, k) => url.searchParams.set(k, v));
  return url;
}

async function proxy(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const targetUrl = buildTargetUrl(req, path);

  // Copy headers (avoid sending host-related headers)
  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("connection");
  headers.delete("content-length");

  const method = req.method.toUpperCase();
  const hasBody = !["GET", "HEAD"].includes(method);
  const body = hasBody ? await req.arrayBuffer() : undefined;

  const upstream = await fetch(targetUrl, {
    method,
    headers,
    body,
    // IMPORTANT for server-side proxying
    cache: "no-store",
  });

  // Pass-through response
  const resHeaders = new Headers(upstream.headers);
  // Avoid issues with compression headers in some environments
  resHeaders.delete("content-encoding");

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: resHeaders,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
