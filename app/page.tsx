import { createHomeMetadata, HomePageContent } from "./home-page";

export const metadata = createHomeMetadata("mk");

export default function HomePage() {
  return <HomePageContent language="mk" />;
}
