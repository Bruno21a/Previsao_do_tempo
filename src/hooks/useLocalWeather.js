import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export function useLocalWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState([]);

  async function fetchWeatherByCoords(lat, lon) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();

      if (data.results) {
        setWeather(data.results);
        setForecast(data.results.forecast.slice(1));
        setError("");
      } else {
        setError("Não foi possível obter os dados do clima.");
        setWeather(null);
      }
    } catch (err) {
      console.error("Erro ao buscar clima:", err);
      setError("Erro de conexão com a API.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocalização não é suportada.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => {
        setError("Permissão de localização negada.");
        setLoading(false);
      }
    );
  }, []);

  return { weather, forecast, loading, error };
}
