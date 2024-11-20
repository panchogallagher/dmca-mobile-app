import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { fetchWeather } from "@/services/WeatherService";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiFog } from "react-icons/wi";
import { Theme } from "@/constants/Theme";
import { Colors } from "@/constants/Colors";

const weatherIcons: { [key: number]: JSX.Element } = {
  0: <WiDaySunny size={50} />, // Soleado
  1: <WiCloudy size={50} />, // Parcialmente nublado
  2: <WiCloudy size={50} />, // Nublado
  3: <WiCloudy size={50} />, // Muy nublado
  45: <WiFog size={50} />, // Niebla
  48: <WiFog size={50} />, // Escarcha
  51: <WiRain size={50} />, // Lluvia ligera
  61: <WiRain size={50} />, // Lluvia
  71: <WiSnow size={50} />, // Nieve ligera
  85: <WiSnow size={50} />, // Nieve intensa
};

const getWeatherIcon = (weatherCode: number) => {
  switch (weatherCode) {
    case 0: // Clear sky
      return { name: "wb-sunny", color: "#FFD700" };
    case 1: // Mainly clear
    case 2: // Partly cloudy
    case 3: // Overcast
      return { name: "cloud", color: "#B0C4DE" };
    case 45: // Fog
    case 48: // Depositing rime fog
      return { name: "foggy", color: "#708090" };
    case 51: // Drizzle
    case 61: // Rain showers
    case 80: // Rain showers
      return { name: "water-drop", color: "#1E90FF" };
    default: // Default case
      return { name: "wb-cloudy", color: "#87CEEB" };
  }
};

const WeatherCard = () => {
  const [time, setTime] = useState(new Date());
  /*
  const [weather, setWeather] = useState({
    temperature: 22,
    condition: "Sunny",
    icon: "weather-sunny", // Por defecto, un día soleado
  });*/
  const [weather, setWeather] = useState<null | {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    time: string;
  }>(null);

  // Actualizar la hora cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadWeather = async () => {
      const weather = await fetchWeather();
      console.log(weather);
      setWeather(weather);
    };
    loadWeather();
  }, []);

  return (
    <View style={styles.card}>
      {/* Fecha en la parte superior */}
      <Text style={styles.date}>{time.toLocaleTimeString()}</Text>
      {/* Contenedor inferior */}
      {weather ? (
        <View style={styles.bottomContainer}>
          {/* Temperatura en la esquina inferior izquierda */}
          <Text style={styles.temperature}>{weather.temperature}°C</Text>
          <MaterialIcons
            name={getWeatherIcon(weather.weathercode).name}
            size={48}
            color={getWeatherIcon(weather.weathercode).color}
          />
        </View>
      ) : (
        <ActivityIndicator color={Colors.light.icon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    maxWidth: 350,
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 5,
  },
  temperature: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  icon: {
    alignSelf: "flex-end",
  },
});

const styles2 = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    marginBottom: 10,
  },
  time: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  icon: {
    marginVertical: 10,
  },
  temperature: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  condition: {
    fontSize: 18,
    color: "#555",
  },
});

export default WeatherCard;
