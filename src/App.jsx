import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import { useLocalWeather } from "./hooks/useLocalWeather";
import { useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [searchForecast, setSearchForecast] = useState([]);
  const [searchWeather, setSearchWeather] = useState(null);
  const [searchError, setSearchError] = useState("");
  const { weather, forecast, loading, error } = useLocalWeather();

  const handleSearch = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&city_name=${encodeURIComponent(cityName)}`
      );
      const data = await response.json();

      if (data.results) {
        setSearchWeather(data.results);
        setSearchForecast(data.results.forecast.slice(1));
        setSearchError("");
      } else {
        setSearchWeather(null);
        setSearchForecast([]);
        setSearchError("Cidade não encontrada!");
      }
    } catch {
      setSearchWeather(null);
      setSearchForecast([]);
      setSearchError("Erro ao buscar dados. Verifique sua conexão.");
    }
  };

  const currentWeather = searchWeather || weather;
  const currentForecast = searchWeather ? searchForecast : forecast;
  const currentError = searchError || error;

  return (
    <div className="app-container">
      <SearchBar onSearch={handleSearch} />

      {loading && <p>Carregando previsão do tempo...</p>}

      {currentError && <p className="error">{currentError}</p>}

      {currentWeather && (
        <>
          <h1>{currentWeather.city}</h1>
          <WeatherCard weather={currentWeather} />
          <ForecastList forecasts={currentForecast} />
        </>
      )}
    </div>
  );
}

export default App;
