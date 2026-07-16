import StationsDirectoryPage, {
  createStationsMetadata,
} from "../../stations/stations-directory";

export const metadata = createStationsMetadata("en");

export default function EnglishStationsPage() {
  return <StationsDirectoryPage language="en" />;
}
