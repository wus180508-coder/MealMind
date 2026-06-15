// ============================================================
// MealMind — DeepSeek API Proxy Route
// 服务端代理，解决浏览器 CORS 问题，保护 API Key
// ============================================================

import { NextResponse } from "next/server";

// Vercel Pro 计划可延长至 60s，Hobby 计划上限 10s
export const maxDuration = 30;

export async function POST(request: Request) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.error("[DeepSeek Proxy] DEEPSEEK_API_KEY 环境变量未设置");
    return NextResponse.json(
      { error: "DEEPSEEK_API_KEY is not configured on server" },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Vercel Hobby 限制 10s，设置 9s 超时以便返回友好错误而非 504
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`[DeepSeek Proxy] API 返回错误 ${response.status}: ${text}`);
      return NextResponse.json(
        { error: `DeepSeek API error ${response.status}: ${text}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    const isAbort =
      (err instanceof DOMException && err.name === "AbortError") ||
      (err instanceof Error && err.name === "AbortError");
    if (isAbort) {
      console.error("[DeepSeek Proxy] 请求超时（9s）");
      return NextResponse.json(
        { error: "DeepSeek API 响应超时，请稍后重试" },
        { status: 504 }
      );
    }
    console.error(`[DeepSeek Proxy] 请求失败: ${String(err)}`);
    return NextResponse.json(
      { error: `Failed to reach DeepSeek API: ${String(err)}` },
      { status: 502 }
    );
  } finally {
    clearTimeout(timeout);
  }
}
