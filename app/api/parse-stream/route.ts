import { NextRequest, NextResponse } from "next/server";
import { parseStreamUrlFromPage } from "../../../lib/stream-parser";

export async function GET(request: NextRequest) {
  const sourceUrl = request.nextUrl.searchParams.get("url");

  if (!sourceUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  let normalized: URL;

  try {
    normalized = new URL(sourceUrl);
  } catch {
    return NextResponse.json({ error: "Invalid url parameter" }, { status: 400 });
  }

  if (!["http:", "https:"].includes(normalized.protocol)) {
    return NextResponse.json({ error: "Unsupported protocol" }, { status: 400 });
  }

  try {
    const parsed = await parseStreamUrlFromPage(normalized.toString());

    return NextResponse.json({
      streamUrl: parsed ?? normalized.toString(),
      parsed: Boolean(parsed),
    });
  } catch {
    return NextResponse.json({ streamUrl: normalized.toString(), parsed: false });
  }
}
