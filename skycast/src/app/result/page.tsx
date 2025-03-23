'use client';
import './result.css';
import { useEffect, useState } from 'react';
import { CiTempHigh } from 'react-icons/ci';
import { IoWaterOutline } from 'react-icons/io5';
import { FaWind } from 'react-icons/fa';
import { IoMdSunny } from 'react-icons/io';
import { FaRegSnowflake } from 'react-icons/fa';
import { IoPartlySunnySharp } from 'react-icons/io5';

type ResultPageProps = {
  city: string;
};

export default function Page({ city }: ResultPageProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  interface WeatherData {
    weather: [
      {
        main: string;
      }
    ];
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
  }

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9b5b054d045effbde8e0b96951bbfe9e&units=metric`
        );
        const data = await response.json();

        // Check for errors. The API returns a code other than 200 if there's an error.
        if (data.cod !== 200) {
          setError('Please enter the correct city name');
          setWeather(null);
        } else {
          setError(null);
          setWeather(data);
        }
      } catch (error) {
        console.log('Error fetching item details:', error);
        setError('Error fetching data');
      }
    };

    if (city) {
      fetchItemDetails();
    }
  }, [city]);

  function toTitleCase(str: string): string {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }

  return (
    <div className="result">
      {error && <div className="error">{error}</div>}
      {weather && (
        <>
          <div className="city">
            <h2>{toTitleCase(city)}</h2>
          </div>
          <div className="temp">
            {weather.main?.temp > 25 ? (
              <IoMdSunny style={{ color: 'orange', fontSize: '45px' }} />
            ) : weather.main?.temp > 10 ? (
              <IoPartlySunnySharp
                style={{ color: 'orange', fontSize: '45px' }}
              />
            ) : (
              <FaRegSnowflake style={{ color: '#48C1EE', fontSize: '45px' }} />
            )}
            <h1> {weather.main?.temp}°C</h1>
          </div>
          <div className="comment">
            <span>{weather.weather?.[0].main}</span>
          </div>
          <div className="tail">
            <div className="box">
              <CiTempHigh className="icon" style={{ color: '#F97316' }} />
              <div className="com">Feels like</div>
              <div className="text">{weather.main?.feels_like}°C</div>
            </div>
            <div className="box">
              <IoWaterOutline className="icon" style={{ color: '#448AF7' }} />

              <div className="com">Humidity</div>
              <div className="text">{weather.main?.humidity}%</div>
            </div>
            <div className="box">
              <FaWind className="icon" style={{ color: '#14B8A6' }} />

              <div className="com">Wind</div>
              <div className="text">{weather.wind?.speed} m/s</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
