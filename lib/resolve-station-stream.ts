type StationLike = {
  url: string;
  shouldParseUrl?: boolean;
};

type ParseResponse = {
  streamUrl?: string;
};

export async function resolveStationStream(station: StationLike): Promise<string> {
  if (!station.shouldParseUrl) {
    return station.url;
  }

  try {
    const response = await fetch(
      `/api/parse-stream?url=${encodeURIComponent(station.url)}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      return station.url;
    }

    const data = (await response.json()) as ParseResponse;
    return data.streamUrl ?? station.url;
  } catch {
    return station.url;
  }
}
