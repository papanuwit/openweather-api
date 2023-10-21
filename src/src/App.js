
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [lat, setLat] = useState(0.00);
  const [lon, setLon] = useState(0.00);


  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLat(latitude)
        setLon(longitude)
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  const getWeatherAPI = async () => {
    await axios(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=48d7e56c6ca5eb96d0f2da1491b1f391&units=metric`,
    )
      .then((res) => {

        setData([res.data])
      })

  }


  useEffect(() => {
    getLocation()
    getWeatherAPI()
  }, [])

  useEffect(() => {

  }, [data])

  return (
    <div className="App">
      <header className="App-header">

        <p>
          OpenWeather API
        </p>
        {
          data?.map((item) => {
            return (
              <>
                <h6>อุณหภูมิ องศา C {item?.main?.temp}</h6>
                <h6>สภาพอากาศ {item?.weather[0]?.main}</h6>
                <img src={`./icons/${item?.weather[0]?.icon + '.png'}`} />

                <h6>ชื่อเมือง {item?.name}</h6>
                <h6>ความกดอากาศ  {item?.main?.pressure}</h6>
                <h6>ความชื้น {item?.main?.humidity}</h6>
              </>
            )

          })
        }


      </header>
    </div>
  );
}

export default App;
