import React, {useState} from 'react';
import './app.css';
import { fetchWeather } from './api/fetchWeather';
const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = async(e)=>{
        if(e.key === 'Enter'){
            const data = await fetchWeather(query);
            setWeather(data)
            setQuery('')
        }
    }

    return(
    <div className="weather-container">
        <h1>Welcome to React Pwa</h1>
        <input className="search" placeholder="Search..." 
        value={query} 
        onChange={(e) => (setQuery(e.target.value))}
        onKeyPress={search}
        />
        {
            weather.main && (
                <div>
                    <h1 className="city-name">
                        <span>{weather.name}</span>
                        <sup>({weather.sys.country})</sup>
                    </h1>
                    <div>
                        <h1>{Math.round(weather.main.temp)}<span>&deg;C</span></h1>
                    </div>
                    <div>
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <div>{weather.weather[0].description.toUpperCase()}</div>
                    </div>
                </div>
            )
        }
    </div>
    ); 
}

export default App;