import { useState, useEffect } from 'react';

import './App.css';
import Clouds from './img/Clouds.jpg';
import Rain from './img/Rain.jpg';
import Storm from './img/Storm.jpg';
import Sun from './img/Sun.jpg';
import Wind from './img/Wind.jpg';

function App() {
  const [data, setData] = useState(undefined);
  const [cityName, setCityName] = useState('');

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e1c32dd0eb29cd3b266f3b06ff7c70b4&units=metric`
    )
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.log(err));
  }, [cityName]);

  const submitHandler = (event) => {
    event.preventDefault();
    setCityName(event.target.firstElementChild.value);
  };

  return (
    <div className='container'>
      <h1>Weather Report</h1>

      <form className='form' onSubmit={submitHandler}>
        <input type='text' name='cityName' id='cityName' className='input' />
        <button className='btn'>Search</button>
      </form>

      {cityName !== '' && data.cod !== '400' && (
        <div className='data'>
          <p className='city'>
            <span>City: </span> {data.name}
          </p>
          <p className='weather'>
            <span>Weather: </span>
            {data.weather[0].main}
          </p>
          <p className='wind'>
            <span>Wind: </span> Speed {data.wind.speed} and {data.wind.deg} deg.
          </p>
          <p className='temp'>
            <span>Temprature: </span> {data.main.temp}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
