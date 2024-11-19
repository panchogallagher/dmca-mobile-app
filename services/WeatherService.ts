export const fetchWeather = async () => {
  const endpoint = "https://api.open-meteo.com/v1/forecast";
  const params = new URLSearchParams({
    latitude: "33.1147204",
    longitude: "-71.5762929",
    current_weather: "true", // Solicitar el clima actual
  });

  try {
    const response = await fetch(`${endpoint}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data.current_weather;
  } catch (error) {
    console.error("Hubo un problema al obtener los datos:", error);
  }
};
