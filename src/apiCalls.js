export const getLines = async () => {
  const response = await fetch('http://restratpws.azurewebsites.net/api/lines/metro');
  const metroLines = await response.json();
  return metroLines
}