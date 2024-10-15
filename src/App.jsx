import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import Clear from "../src/assets/clear.png";
import Cloude from "../src/assets/cloud.png";
import Drizzle from "../src/assets/drizzle.png";
import Humidity from "../src/assets/humidity.png";
import Rain from "../src/assets/rain.png";
import Snow from "../src/assets/snow.png";
import Wind from "../src/assets/wind.png";
function App() {
  const [weather, SetWeather] = useState(false);
  const inputRef = useRef();
  const icons = {
    "01d": Clear,
    "01n": Clear,
    "02d": Cloude,
    "02n": Cloude,
    "03d": Cloude,
    "03n": Cloude,
    "04d": Drizzle,
    "04n": Drizzle,
    "09d": Rain,
    "09n": Rain,
    "10d": Rain,
    "10n": Rain,
    "13d": Snow,
    "13n": Snow,
  };
  const Search = async (City) => {
    if (City === "") {
      window.alert("Plese Enter The City");
    }
    try {
      const Url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const Response = await fetch(Url);
      const Data = await Response.json();
      const icon = icons[Data.weather[0].icon] || Clear;
      SetWeather({
        humidity: Data.main.humidity,
        windSpeed: Data.wind.speed,
        tempruture: Math.floor(Data.main.temp),
        location: Data.name,
        icon: icon,
      });
      if (!Response.ok) {
        window.alert("The City Is Not Find");
      }
    } catch {
      SetWeather(false);
      console.error("Error fetching weather data:");
    }
  };
  useEffect(() => {
    Search("London");
  }, []);
  return (
    <div className="app">
      <div className="head-box">
        <h1>Weather App</h1>
      </div>
      <div className="inputs">
        <input ref={inputRef} type="text" placeholder="Enter a Contry" />
        <img
          src="../src/assets/search.png"
          alt="Search"
          onClick={() => Search(inputRef.current.value)}
        />
      </div>
      {weather ? (
        <>
          <div className="stuts">
            <img src={weather.icon} alt="Weather" />
            <div className="text">
              <p className="temprature">{weather.tempruture} C</p>
              <p className="cityName">{weather.location}</p>
            </div>
          </div>
          <div className="last-details">
            <div className="left">
              <div className="img-left">
                <img src={Humidity} alt="Img" />
                <div className="humidity">
                  <p className="top-humdity">{weather.humidity} %</p>
                  <p className="bottom-humdity">Humidity</p>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="img-right">
                <img src={Wind} alt="img" />
                <div className="wind">
                  <p className="wind-top">{weather.windSpeed} km/h</p>
                  <p className="wind-bottom">Wind speed</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
