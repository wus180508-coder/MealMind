// ============================================================
// MealMind V1.5 — DeepSeek API Client
// 通过 Next.js API Route 代理调用，解决浏览器 CORS 问题
// ============================================================

export async function callDeepSeek(prompt: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch("/api/deepseek", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 1000,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const json = await response.json().catch(() => null);
      const msg = json?.error || `HTTP ${response.status}`;
      throw new Error(`DeepSeek API error ${response.status}: ${msg}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content || typeof content !== "string") {
      throw new Error("Empty or invalid response from DeepSeek API");
    }

    return content;
  } finally {
    clearTimeout(timeout);
  }
}
