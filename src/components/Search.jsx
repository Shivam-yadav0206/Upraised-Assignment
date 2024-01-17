import { useState } from "react";
import WeatherCard from "./WeatherCard";

const Search = () => {
  const [searchText, setSearchText] = useState("");
    const [cityDataVisibility, setCityDataVisibility] = useState(false);
    const [wData, setWData] = useState(null);

  // Define the function outside handleSearch to reuse it
  const getWeatherData = async (city) => {
    const params = new URLSearchParams({
      q: `${city}`,
      appid: "4aa0af2ac26dad5a0f0d512c010de814",
    });
    const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    console.log("Search text:", searchText);

    if (searchText.trim() !== "") {
        const data = await getWeatherData(searchText);
        setWData(data)


      setCityDataVisibility(true);
      setSearchText("");
    }
    };
    
    

  return (
    <>
      <div className="mt-10 max-w-lg w-full mx-auto rounded-xl bg-white shadow-lg p-10 text-gray-800 relative overflow-hidden ">
        <div className="relative mt-1 ">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            value={searchText}
            className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Search Cities..."
          />
          <button
            onClick={() => handleSearch()}
            className="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 48 48"
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
              }}>
              <path
                fill="#616161"
                d="M34.6 28.1H38.6V45.1H34.6z"
                transform="rotate(-45.001 36.586 36.587)"></path>
              <path
                fill="#616161"
                d="M20 4A16 16 0 1 0 20 36A16 16 0 1 0 20 4Z"></path>
              <path
                fill="#37474F"
                d="M36.2 32.1H40.2V44.400000000000006H36.2z"
                transform="rotate(-45.001 38.24 38.24)"></path>
              <path
                fill="#64B5F6"
                d="M20 7A13 13 0 1 0 20 33A13 13 0 1 0 20 7Z"></path>
              <path
                fill="#BBDEFB"
                d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"></path>
            </svg>
          </button>
        </div>
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="h-2 bg-blue-500 flex-1"></div>
          <div className="h-2 bg-red-500 flex-1"></div>
          <div className="h-2 bg-yellow-500 flex-1"></div>
          <div className="h-2 bg-blue-500 flex-1"></div>
          <div className="h-2 bg-green-500 flex-1"></div>
          <div className="h-2 bg-red-500 flex-1"></div>
        </div>
      </div>

      {cityDataVisibility && <WeatherCard info={wData} />}
    </>
  );
};

export default Search;
