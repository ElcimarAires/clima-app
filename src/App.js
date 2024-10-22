import React, { useState } from 'react';
import './App.css';

const api = {
  key: "3ee32176fbc4070662893138e0e9dea6",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&lang=pt_br&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }

  const background = weather.main && weather.main.temp > 15 ? 'warm' : 'cold';

  return (
    <div className={`app ${background}`}>
      <input
        type="text"
        className="search-bar"
        placeholder="Digite a cidade..."
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
      />
      {typeof weather.main != "undefined" ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{new Date().toLocaleDateString()}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
            <div className="weather">{weather.weather[0].main}</div>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          </div>
        </div>
      ) : ('')}
    </div>
  );
}

export default App;



