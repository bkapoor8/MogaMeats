import axios from "axios";
 
const GOOGLE_API_KEY = "AIzaSyCCGghgOEG3d9HAF1UXIj5P9PBeQ_gvxls" as string;
 
const toRad = (value: number) => (value * Math.PI) / 180;
 
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
 
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
 
  return +(R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))).toFixed(2);
}
 
export async function getDistance(
  origin: string,
  destination: string
): Promise<{ distanceText: string; distanceValue: number } | null> {
  try {
    if (!GOOGLE_API_KEY) throw new Error("No Google API Key");
 
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
      origin
    )}&destinations=${encodeURIComponent(destination)}&key=${GOOGLE_API_KEY}`;
 
    const { data } = await axios.get(url);
 
    const element = data?.rows?.[0]?.elements?.[0];
    if (element?.status === "OK") {
      return {
        distanceText: element.distance.text,
        distanceValue: element.distance.value / 1000,
      };
    }
 
    throw new Error("API returned no result");
  } catch (error) {
    console.warn("Falling back to Haversine:", error?.toString());
 
    try {
      const geoUrl1 = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        origin
      )}&key=${GOOGLE_API_KEY}`;
      const geoUrl2 = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        destination
      )}&key=${GOOGLE_API_KEY}`;
 
      const [geo1, geo2] = await Promise.all([axios.get(geoUrl1), axios.get(geoUrl2)]);
      const loc1 = geo1.data.results[0]?.geometry?.location;
      const loc2 = geo2.data.results[0]?.geometry?.location;
 
      if (loc1 && loc2) {
        const km = haversineDistance(loc1.lat, loc1.lng, loc2.lat, loc2.lng);
        return { distanceText: `${km} km`, distanceValue: km };
      }
    } catch (geoError) {
      console.error("Geocoding failed:", geoError);
    }
 
    return null;
  }
}