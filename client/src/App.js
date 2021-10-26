import React, { useState } from 'react'
import {getWeather} from './api/getWeather'
import './App.css'

function App(){

    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const search = async (e) => {
        if (e.key === 'Enter') {
            setError(false)
            setLoading(true)
            const data = await getWeather(query)
            
            if(data.error === true) {
                setLoading(false)
                setError(true)
            } else {
                setWeather(data)
                setLoading(false)
            }
            //console.log(data)
        }
    }

    const styles = {
        backgroudColor: "white",
        backgroud: "white",
        color: "white",
        widht: "50%",
        margin: "2rem"

    }

    
    return (
        
        <div className="main-container">
            <h1 style={styles}> Enter city name to get weather</h1>
            <input
                type="text"
                className="search"
                placeholder="Search ..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
            />
            { loading && <div style={styles}><h2>fetching data for {query}... </h2></div>}
            {!error ? <React.Fragment>
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
            </React.Fragment> : 
            
            <div style={styles}><h2>Could not fetch data for the requested city, make sure the spelling is correct</h2></div>}
        </div>
    )
}

export default App