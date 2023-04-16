type Facility = {
  name: string;
  latitude: number;
  longitude: number;
};

type FacilityWithDistance = {
  facility: Facility;
  distance: number;
};

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
  const distance = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  return distance;
}

function calculateDistance(
  sourceLatitude: number,
  sourceLongitude: number,
  destinations: Array<Facility>
): Array<FacilityWithDistance> {
  const distances: Array<FacilityWithDistance> = [];

  for (const facility of destinations) {
    const distanceInMeters = haversineDistance(
      sourceLatitude,
      sourceLongitude,
      facility.latitude,
      facility.longitude
    );

    distances.push({
      facility,
      distance: distanceInMeters
    });
  }

  return distances;
}

function getNearest(
  distances: Array<FacilityWithDistance>
): FacilityWithDistance {
  return distances.reduce((prev, curr) =>
    prev.distance < curr.distance ? prev : curr
  );
}

export { calculateDistance, getNearest };
