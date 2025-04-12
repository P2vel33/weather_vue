export default async function getLocationByIp() {
  try {
    const response = await fetch("https://ipapi.co/json");
    const { latitude, longitude } = await response.json();
    return { latitude, longitude };
  } catch (error) {
    console.log(error);
  }
}
