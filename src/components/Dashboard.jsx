import { useState, useEffect } from "react";
import Chart from "./Chart";
const Dashboard = () => {
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState({});
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherData = async () => {
    const params = new URLSearchParams({
      lat: `${location.lat}`,
      lon: `${location.lon}`,
      appid: "4aa0af2ac26dad5a0f0d512c010de814",
    });
    const url = `https://api.openweathermap.org/data/2.5/forecast?${params}`;
    try {
      console.log(location.lat, location.lon);
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      setWeatherData(result.list.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      if ("geolocation" in navigator) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          setLocation({ lat: latitude, lon: longitude });
          getWeatherData();
        } catch (error) {
          console.error("Error getting location:", error.message);
        }
      } else {
        console.error("Geolocation is not supported.");
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      getWeatherData();
    }
  }, [location]);

  return (
    <div className="my-5">


      <Chart data={weatherData} />
    </div>
  );
};

export default Dashboard;
