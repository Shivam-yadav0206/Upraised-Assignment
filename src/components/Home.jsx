import { useState, useEffect } from "react";
import { City, Country, State } from "country-state-city";
import Selector from "./Selector";
import { Link } from "react-router-dom";
import WeatherCard from "./WeatherCard";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();
  const [cityDataVisibility, setCityDataVisibility] = useState(false);

  const [country, setCountry] = useState(countryData[0]);
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherData = async (city) => {
    const params = new URLSearchParams({
      q: `${city.name}`,
      appid: "4aa0af2ac26dad5a0f0d512c010de814",
    });
    const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;
    try {
      console.log(city);
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      setWeatherData(result);
      setCityDataVisibility(true);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  }, [state]);

  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

  useEffect(() => {
    cityData && setCity(cityData[0]);
  }, [cityData]);
  return (
    <div className="p-2 m-2">
      
      {/* <h1 className="text-5xl mx-auto text-center my-2 ">Or</h1> */}
      <div className="my-5 rounded-lg px-3 grid place-items-center pb-20 selection:text-white ">
        <div>
          <h2 className="text-2xl font-bold text-teal-900 m-2 text-center">
            Select Country, State and City
          </h2>
          <br />
          <div className="flex flex-wrap gap-3 bg-gray-300 rounded-lg p-8">
            <div>
              <p className="text-teal-800 font-semibold">Country :</p>
              <Selector
                data={countryData}
                selected={country}
                setSelected={setCountry}
              />
            </div>
            {state && (
              <div>
                <p className="text-teal-800 font-semibold">State :</p>
                <Selector
                  data={stateData}
                  selected={state}
                  setSelected={setState}
                />
              </div>
            )}
            {city && (
              <div>
                <p className="text-teal-800 font-semibold">City :</p>
                <Selector
                  data={cityData}
                  selected={city}
                  setSelected={setCity}
                />
              </div>
            )}
          </div>
          <div className="text-center">
            <button
              className="text-white bg-gray-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={() => getWeatherData(city)}>
              🔎 Search
            </button>
          </div>
        </div>
      </div>

      {cityDataVisibility && <WeatherCard info = {weatherData} />}
    </div>
  );
};

export default Home;
