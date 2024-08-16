import React, { useEffect, useState } from "react";
import totalDataService from "../services/totalData.service";

function Cuaca() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async (lat, lon) => {
      try {
        const response = await totalDataService.getWeatherData(lat, lon);
        setWeatherData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
            console.log(latitude, longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
            // Fallback to default coordinates if user denies location access
            fetchWeatherData(-5.4264, 105.2639);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        // Fallback to default coordinates
        fetchWeatherData(-5.4264, 105.2639);
      }
    };

    getLocation();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { name, weather, main, visibility, wind } = weatherData;
  const { description, icon } = weather[0];
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="flex flex-col bg-white rounded-xl duration-300 p-4 w-1/3 shadow-lg">
      <div className="font-bold text-xl text-center">{name}</div>
      <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-gray-900 h-24 w-24">
        <img src={iconUrl} alt={description} className="h-24 w-24" />
      </div>
      <div className="flex flex-row items-center justify-center mt-6 mb-cb1">
        <div className="font-medium text-4xl">{description}</div>
      </div>
      <div className="flex flex-col mt-6">
        <div className="flex flex-row justify-between mb-4">
          <div className="flex flex-col items-center justify-center w-1/3">
            <div className="font-medium text-sm">Temperature</div>
            <div className="text-sm text-gray-500">{main.temp}°C</div>
          </div>
          <div className="flex flex-col items-center justify-center w-1/3">
            <div className="font-medium text-sm">Humidity</div>
            <div className="text-sm text-gray-500">{main.humidity}%</div>
          </div>
          <div className="flex flex-col items-center justify-center w-1/3">
            <div className="font-medium text-sm">Pressure</div>
            <div className="text-sm text-gray-500">{main.pressure} hPa</div>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col items-center justify-center w-1/3">
            <div className="font-medium text-sm">Wind Speed</div>
            <div className="text-sm text-gray-500">{wind.speed} m/s</div>
          </div>
          <div className="flex flex-col items-center justify-center w-1/3">
            <div className="font-medium text-sm">Visibility</div>
            <div className="text-sm text-gray-500">{visibility / 1000} km</div>
          </div>
          <div className="flex flex-col items-center justify-center w-1/3">
            <div className="font-medium text-sm">Wind Direction</div>
            <div className="text-sm text-gray-500">{wind.deg}°</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cuaca;
