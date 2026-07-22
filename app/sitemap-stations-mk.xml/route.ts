import { getStationSitemapUrls, renderUrlSet, xmlResponse } from "@/lib/sitemap";

export const dynamic = "force-static";

export function GET() {
  return xmlResponse(renderUrlSet(getStationSitemapUrls("mk")));
}
