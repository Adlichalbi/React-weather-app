/* eslint-disable no-unused-vars */
import "./Weather.css";
import SearchIcon from "../assets/search.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import clear from "../assets/clear.png";
import { useEffect, useState } from "react";

const Weather = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [countryFlag, setCountryFlag] = useState("");

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(location);
    }
  };

  const handleSearch = async (location) => {
    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${
        import.meta.env.VITE_KEY_Weather
      }&units=metric`;

      const response = await fetch(URL);
      const data = await response.json();
      setWeather(data);
      //Set country flag
      setCountryFlag(`https://flagsapi.com/${data.sys.country}/flat/64.png`);
      // Set the weather icon based on the weather condition
      switch (data.weather[0].main) {
        case "Clouds":
          setWeatherIcon(cloud);
          break;
        case "Drizzle":
          setWeatherIcon(drizzle);
          break;
        case "Rain":
          setWeatherIcon(rain);
          break;
        case "Snow":
          setWeatherIcon(snow);
          break;
        case "Clear":
          setWeatherIcon(clear);
          break;
        case "Wind":
          setWeatherIcon(wind);
          break;
        default:
          setWeatherIcon(clear); // Default to clear if no matching condition
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSearch("Gafsa");
  }, []);

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={location}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => handleSearch(location)}
        />
      </div>
      {weather && (
        <>
          <img
            src={weatherIcon}
            alt={weather.weather[0].description}
            className="weather-icon"
          />
          <p className="temperature">{Math.floor(weather.main.temp)}°C</p>
          <p className="location">{weather.name}</p>
          <img src={countryFlag} alt="Country-flag" />
          <div className="weather-data">
            <div className="col">
              <img src={humidity} alt="humidity icon" />
              <div>
                <p>{weather.main.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="wind icon" />
              <div>
                <p>{weather.wind.speed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
