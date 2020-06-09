export const fetchLines = async () => {
  try {
    const response = await fetch('http://restratpws.azurewebsites.net/api/lines/metro');
    if(!response.ok) {
      console.log(response.status);
      throw new Error('The métro system is down at this time.')
    }
    const metroLines = await response.json();
    return metroLines
  }
  catch (e) {
    console.log(e.message);
  }
};

export const fetchStations = async (lineId) => {
  try {
    const response = await fetch(`http://restratpws.azurewebsites.net/api/stations/${lineId}`);
    if(!response.ok) {
      console.log(response.status);
      throw new Error('The métro system is down at this time.')
    }
    const stations = await response.json();
    return stations
  }
  catch (e) {
    console.log(e.message);
  }
};

export const fetchDirections = async (directionId) => {
  try {
    const response = await fetch(`http://restratpws.azurewebsites.net/api/directions/${directionId}`);
    if(!response.ok){
      console.log(response.status);
      throw new Error('The métro system is down at this time.')
    }
    const stations = await response.json();
    return stations
  }
  catch (e) {
    console.log(e.message);
  }
}

export const fetchNextArrivals = async (lineId, stationId, directionId) => {
  try {
    const response = await fetch(`http://restratpws.azurewebsites.net/api/Missions/${lineId}/from/${stationId}/way/${directionId}`);
    if(!response.ok){
      console.log(response.status);
      throw new Error('The métro system is down at this time.')
    }
    const nextArrivals = await response.json();
    return nextArrivals
  }
  catch (e) {
    console.log(e.message);
  }
}
