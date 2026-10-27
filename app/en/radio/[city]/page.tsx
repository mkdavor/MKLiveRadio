import type { Metadata } from "next";
import CityPage, { generateCityMetadata, generateCityStaticParams } from "../../../radio/city-page";

type CityPageProps = {
  params: Promise<{ city: string }>;
};

export const generateStaticParams = generateCityStaticParams;

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  return generateCityMetadata(city, "en");
}

export default async function EnglishCityPage({ params }: CityPageProps) {
  const { city } = await params;
  return <CityPage slug={city} language="en" />;
}
