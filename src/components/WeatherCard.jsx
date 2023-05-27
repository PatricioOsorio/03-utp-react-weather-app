import { useState, useEffect } from 'react';
import {
  API_KEY_OPENWEATHER,
  API_KEY_UNSPLASH,
  ENDPOINT_CURRENT_WEATHER,
  ENDPOINT_GEOCODING,
  ENDPOINT_UNSPLASH,
} from '../constans';

const WeatherCard = ({ city, country }) => {
  const [location, setLocation] = useState('Location');
  const [temperatureC, setTemperatureC] = useState(0);
  const [weatherDescription, setWeatherDescription] = useState('uknown');
  const [weatherIconCode, setweatherIconCode] = useState('04d');
  const [humidity, setHumidity] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [srcImage, setSrcImage] = useState('');

  // Functions
  const getCoordinates = async (apiKey, place, limit = 3) => {
    try {
      const res = await fetch(
        `${ENDPOINT_GEOCODING}?appid=${apiKey}&q=${place}&limit=${limit}`
      );
      const json = await (res.ok ? res.json() : Promise.reject(res));

      return json;
    } catch (error) {
      console.warn(error);
    }
  };

  const getCurrentWeather = async (
    apiKey,
    lat,
    lon,
    units = 'metric',
    lang = 'es'
  ) => {
    try {
      const res = await fetch(
        `${ENDPOINT_CURRENT_WEATHER}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${lang}`
      );
      const json = await (res.ok ? res.json() : Promise.reject(res));

      return json;
    } catch (error) {
      console.warn(error);
    }
  };

  const getSrcImage = async (query) => {
    try {
      const res = await fetch(
        `${ENDPOINT_UNSPLASH}?client_id=${API_KEY_UNSPLASH}&page=1&per_page=1&orientation=landscape&query=${query}`
      );
      const json = await (res.ok ? res.json() : Promise.reject(res));

      return json;
    } catch (error) {
      console.warn(error);
    }
  };

  // Hooks
  useEffect(() => {
    const firstExecution = async () => {
      const [firstMatch] = await getCoordinates(
        API_KEY_OPENWEATHER,
        `${city}, ${country}`
      );
      const { lat, lon, local_names } = firstMatch;

      const currentWeather = await getCurrentWeather(
        API_KEY_OPENWEATHER,
        lat,
        lon,
        'metric',
        'es'
      );

      const srcImage = await getSrcImage(
        `Clima ${currentWeather.weather[0].description}`
      );

      setLocation(local_names.es);
      setTemperatureC(currentWeather.main.temp);
      setWeatherDescription(currentWeather.weather[0].description);
      setweatherIconCode(currentWeather.weather[0].icon);
      setHumidity(currentWeather.main.humidity);
      setWindSpeed(currentWeather.wind.speed);
      setSrcImage(srcImage.results[0].urls.small);
    };

    firstExecution();
  }, []);

  return (
    <article
      className="card text-bg-dark mb-3 shadow border border-0"
      style={{ height: '400px' }}
    >
      <img
        style={{ height: '400px'}}
        className="card-img"
        src={srcImage}
        alt=""
      />
      <div className="card-img-overlay bg-black bg-gradient bg-opacity-50">
        <h2>{location}</h2>
        <p>
          {new Date().toUTCString('es-MX', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <p>{temperatureC}°C</p>
        <p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherIconCode}.png`}
            alt=""
          />
          {weatherDescription}
        </p>
        <p>Humedad: {humidity}%</p>
        <p>Velocidad de viento: {windSpeed}km/h</p>
      </div>
    </article>
  );
};

export default WeatherCard;
