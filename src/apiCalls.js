export const fetchLines = async () => {
  try {
    const response = await fetch('https://api-ratp.pierre-grimaud.fr/v4/lines/metros');
    if(!response.ok) {
      console.log(response.status);
      throw new Error('The métro system is down at this time.')
    }
    const metroLines = await response.json();
    console.log(metroLines)
    return metroLines
  }
  catch (e) {
    console.log(e.message);
  }
};

export const fetchStations = async (lineId) => {
  try {
    const response = await fetch(`https://api-ratp.pierre-grimaud.fr/v4/stations/metros/${lineId}`);
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
    const response = await fetch(`https://api-ratp.pierre-grimaud.fr/v4/destinations/metros/${directionId}`);
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
    const response = await fetch(`https://api-ratp.pierre-grimaud.fr/v4/schedules/metros/${lineId}/${stationId}/${directionId}`);
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
