import { absoluteUrl } from "@/lib/seo";
import {
  renderSitemapIndex,
  xmlResponse,
} from "@/lib/sitemap";

export const dynamic = "force-static";

export function GET() {
  return xmlResponse(renderSitemapIndex([
    { loc: absoluteUrl("/sitemap-pages.xml") },
    { loc: absoluteUrl("/sitemap-stations-mk.xml") },
    { loc: absoluteUrl("/sitemap-stations-en.xml") },
  ]));
}
