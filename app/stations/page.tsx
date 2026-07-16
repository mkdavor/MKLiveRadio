import StationsDirectoryPage, { createStationsMetadata } from "./stations-directory";

export const metadata = createStationsMetadata("mk");

export default function MacedonianStationsPage() {
  return <StationsDirectoryPage language="mk" />;
}
