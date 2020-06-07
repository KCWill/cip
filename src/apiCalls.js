export const fetchLines = async () => {
  const response = await fetch('http://restratpws.azurewebsites.net/api/lines/metro');
  const metroLines = await response.json();
  return metroLines
}

export const fetchStations = async (lineId) => {
  const response = await fetch(`http://restratpws.azurewebsites.net/api/stations/${lineId}`);
  const stations = await response.json();
  return stations
}

export const fetchDirections = async (directionId) => {
  const response = await fetch(`http://restratpws.azurewebsites.net/api/directions/${directionId}`);
  const stations = await response.json();
  return stations
}

export const fetchNextArrivals = async (lineId, stationId, directionId) => {
  const response = await fetch(`http://restratpws.azurewebsites.net/api/Missions/${lineId}/from/${stationId}/way/${directionId}`);
  const nextArrivals = await response.json();
  return nextArrivals
}

export const fetchStationData = async (lineId) => {
  const response = await fetch(`http://restratpws.azurewebsites.net/api/Stations/${lineId}`);
  const stationName = await response.json();
  return stationName
}