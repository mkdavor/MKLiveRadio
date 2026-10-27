import type { Metadata } from "next";
import CityPage, { generateCityMetadata, generateCityStaticParams } from "../city-page";

type CityPageProps = {
  params: Promise<{ city: string }>;
};

export const generateStaticParams = generateCityStaticParams;

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  return generateCityMetadata(city, "mk");
}

export default async function MacedonianCityPage({ params }: CityPageProps) {
  const { city } = await params;
  return <CityPage slug={city} language="mk" />;
}
