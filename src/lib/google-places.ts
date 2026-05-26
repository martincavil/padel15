interface GoogleRating {
  rating: number;
  userRatingCount: number;
}

export async function fetchGoogleRating(): Promise<GoogleRating | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount&key=${apiKey}`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (typeof data.rating !== "number") return null;
    return { rating: data.rating, userRatingCount: data.userRatingCount ?? 0 };
  } catch {
    return null;
  }
}
