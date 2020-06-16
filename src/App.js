import React, { useState } from 'react';

import { Animated } from "react-animated-css";

const api = {
  key: "da3a54b57f413b734a98033ae17ab297",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <Animated animationIn="bounceInLeft" animationOut="fadeOut" animationInDuration="1000" isVisible={true}>
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp < 20) ? 'app-cold' : 'app') : 'app'}>
        <main>
          <div className="search-box">
            <input 
              type="text"
              className="search pa3 ba b--green"
              placeholder="Search..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {(typeof weather.main != "undefined") ? (
          <div className="tc">
            <div className="location-box mt5">
              <div className="location mt2">{weather.name}, {weather.sys.country}</div>
              <div className="date mt2">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box mt5">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>
            </div>
           
               <div className="weather mt4">{weather.weather[0].main}</div>
               {(weather.main.humidity>70 && weather.wind.speed>3 ) ?
                  (<div className="predict">It's gonna be a very windy and rainy day today,Don't forget your umbrella while going out!</div>) :
                  (<div className="predict">It's gonna be a pleasant day for you!!</div>)}
              </div>
        
        ) :
        (
          <div className='display tc mt7 grow '>Get weather updates of any place here!</div>
        )}
      </main>
    </div>
  </Animated>
  );
}

export default App;
