import { createHomeMetadata, HomePageContent } from "../home-page";

export const metadata = createHomeMetadata("en");

export default function EnglishHomePage() {
  return <HomePageContent language="en" />;
}
