import "./styles.css";

const ForecastItem = ({ date, min, max, condition, description }) => {
  return (
    <div className="forecast-item">
      <p className="forecast-day">{date}</p>
      <img src={`/icons-weather/${condition}.svg`} alt={description} />
      <p className="forecast-temp">
        {min}/{max}°
      </p>
    </div>
  );
};

export default ForecastItem;
