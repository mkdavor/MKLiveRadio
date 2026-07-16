import type { Metadata } from "next";
import StationDetailPage, {
  generateStationMetadata,
  generateStationStaticParams,
} from "../../../stations/station-detail";

type StationPageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = generateStationStaticParams;

export async function generateMetadata({ params }: StationPageProps): Promise<Metadata> {
  const { slug } = await params;
  return generateStationMetadata(slug, "en");
}

export default async function EnglishStationPage({ params }: StationPageProps) {
  const { slug } = await params;
  return <StationDetailPage slug={slug} language="en" />;
}
