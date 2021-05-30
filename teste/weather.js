const weather = document.querySelector(".js-weather");
const COORDS = "coords";
const API_KEY = "402c6479f4471ed73175b1a35d6abe58";

function getweather(lat, log) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `CURRENT TEMPERATURE ${temperature}°C CURRENT LOCATION ${place}`;
    });
}

function saveCoords(coordsOj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsOj));
}

function handleGeosucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsOj = {
    latitude,
    longitude,
  };
  saveCoords(coordsOj);
  getweather(latitude, longitude);
}

function handleGeoErr() {
  console.log("can't access geo location");
}

function askforCoords() {
  navigator.geolocation.getCurrentPosition(handleGeosucces, handleGeoErr);
}

function loadCoord() {
  const loadedcord = localStorage.getItem(COORDS);
  if (loadedcord === null) {
    askforCoords();
  } else {
    const parseCoords = JSON.parse(loadedcord);
    getweather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoord();
}
init();
