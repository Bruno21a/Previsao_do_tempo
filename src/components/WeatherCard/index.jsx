import "./styles.css";

const WeatherCard = ({ weather }) => {
  return (
    <section className="weather-card">
      <p>Hoje ({weather.forecast[0].date})</p>
      <img
        src={`/icons-weather/${weather.condition_slug}.svg`}
        alt={weather.description}
      />
      <h2 className="temperature">{weather.temp}°</h2>
      <p className="condition">{weather.description}</p>

      <div className="humidity">
        <div>
          <img src="/humidity.svg" alt="Ícone de umidade" />
          <p>Umidade:</p>
        </div>
        <span>{weather.humidity}%</span>
      </div>

      <div className="min-max">
        <div>
          <img src="/temp.svg" alt="Ícone de temperatura" />
          <p>Min/Max:</p>
        </div>
        <span>
          {weather.forecast[0].min}/{weather.forecast[0].max}°
        </span>
      </div>
    </section>
  );
};

export default WeatherCard;
