import { LatLngExpression } from 'leaflet';

export async function geocodeAddress(address: string): Promise<LatLngExpression | undefined> {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return [parseFloat(lat), parseFloat(lon)];
    }
  } catch (error) {
    console.log('Geocoding error:', error);
  }
  return undefined;
}
