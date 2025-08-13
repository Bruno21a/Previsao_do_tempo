import ForecastItem from "../ForecastItem";
import "./styles.css";

const ForecastList = ({ forecasts }) => {
  return (
    <div className="forecast-list">
      {forecasts.map((forecast, index) => (
        <ForecastItem key={index} {...forecast} />
      ))}
    </div>
  );
};

export default ForecastList;
