import React, { useState } from 'react'
import {getWeather} from './api/getWeather'
import './App.css'

function App(){

    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})
    const search = async (e) => {
        if (e.key === 'Enter') {
            const data = await getWeather(query)
            setWeather(data)
            //console.log(data)
        }
    }
    return (
        <div className="main-container">
            <input
                type="text"
                className="search"
                placeholder="Search ..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
            />

            { weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{ weather.sys.country }</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div style={{color: "red"}}>Maximum: {Math.round(weather.main.temp_max)}<sup>&deg;C</sup></div>
                    <div style={{color: "blue"}}>Minimum: {Math.round(weather.main.temp_min)}<sup>&deg;C</sup></div>
                    <div className="info">
                        <img className="city-icon" 
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                            alt={`imageNotFound`} 
                        />
                        <h3>{weather.weather[0].description}</h3>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App