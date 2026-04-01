export function extractStreamUrlFromHtml(html: string): string | null {
  // Mirrors iOS logic from AudioPlayerProvider.extractStreamURL
  const match = html.match(/https[^"]+\.m3u8\?[^"]+/);

  if (!match) {
    return null;
  }

  return match[0].replace(/"/g, "");
}

export async function parseStreamUrlFromPage(pageUrl: string): Promise<string | null> {
  const response = await fetch(pageUrl, { cache: "no-store" });

  if (!response.ok) {
    return null;
  }

  const html = await response.text();
  return extractStreamUrlFromHtml(html);
}
