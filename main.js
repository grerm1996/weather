let d = document;
document.addEventListener('DOMContentLoaded', () => {
    const forecast = d.getElementById('forecast');
    const cityheader = d.getElementById('cityheader');
    console.log(cityheader);
    let weatherData = {};
    const citybtn = d.getElementById('citybtn');
    citybtn.addEventListener('click', getWeather);
    const countryheader = d.getElementById('countryheader');
    console.log(countryheader);
    const state = d.getElementById('state');
    const temp = d.getElementById('temp');
    const humidity = d.getElementById('humidity');
});

async function getWeather(e) {
  e.preventDefault();
  const requestedCity = d.getElementById('cityinput').value;
  let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=66c4d05b655444a596e162812230604&q=${requestedCity}`, { mode: 'cors' });
  let rawData = await response.json();
  await console.log(rawData);
    weatherData = {
    city: rawData.location.name,
    region: rawData.location.region,
    country: rawData.location.country,
    state: rawData.current.condition.text,
    icon: rawData.current.condition.icon,
    feelslike: rawData.current.feelslike_c,
    temp: rawData.current.temp_c,
    humidity: rawData.current.humidity,
    daytime: rawData.current.is_day,
  }
  console.log(weatherData);
  cityheader.textContent = weatherData.city;
  if (weatherData.region == '') {
    countryheader.textContent = weatherData.country;
    console.log('no region');
  } else {countryheader.textContent = `${weatherData.region}, ${weatherData.country}`};
  state.textContent = weatherData.state;
  let iconurl = weatherData.icon;
  let newiconurl = `https:` + weatherData.icon;
  const img = d.getElementById('icon');
  img.setAttribute('src', newiconurl);
  temp.textContent = `${weatherData.temp}°C`;
  humidity.textContent = `feels like ${weatherData.feelslike}°C`
  let feelslike = d.getElementById('feelslike');
  feelslike.textContent = `humidity: ${weatherData.humidity}% `

};
