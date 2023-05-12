// Codes for Current Date & Time
let now = new Date();
let mainDay = document.querySelector("#mainday");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let date = days[now.getDay()];
mainDay.innerHTML = `${date}`;

let hours = now.getHours();
let minutes = now.getMinutes();
let mainTime = document.querySelector("#maintime");
if (hours <= 12) {
  mainTime.innerHTML = `${hours}:${minutes} AM`;
} else {
  mainTime.innerHTML = `${hours}:${minutes} PM`;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apikey = "19068f8a321ad3b406b14t19od030ff8";
  let apiforecastURL = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apikey}&units=metric`;
  console.log(apiforecastURL);
  axios.get(apiforecastURL).then(displayForecast);
}

function showTemp(response) {
  let mainTemp = document.querySelector("#maintemp");
  let mainCity = document.querySelector("#maincity");
  let mainDesc = document.querySelector("#maindesc");
  let mainHum = document.querySelector("#mainhumidity");
  let mainWind = document.querySelector("#mainwind");
  let mainDay = document.querySelector("#mainday");
  let mainTime = document.querySelector("#maintime");
  let mainemoji = document.querySelector("#bigemoji");

  celsciusTemp = response.data.main.temp;
  mainTemp.innerHTML = Math.round(celsciusTemp);
  mainCity.innerHTML = response.data.name;
  mainDesc.innerHTML = response.data.weather[0].description;
  mainHum.innerHTML = response.data.main.humidity;
  mainWind.innerHTML = response.data.wind.speed;
  mainemoji.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b64318e94d52af1eebd0bbbbcb9290b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function search(city) {
  let apiKey = "b64318e94d52af1eebd0bbbbcb9290b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input");
  search(inputCity.value);
}

// function displayFahTemp(event) {
//   event.preventDefault();
//   let convertedFahTemp = (celsciusTemp * 9) / 5 + 32;
//   celsTemp.classList.remove("active");
//   fahrenTemp.classList.add("active");
//   let celtofahTemp = document.querySelector("#maintemp");
//   celtofahTemp.innerHTML = Math.round(convertedFahTemp);
// }

// function displayCelTemp(event) {
//   event.preventDefault();
//   celsTemp.classList.add("active");
//   fahrenTemp.classList.remove("active");
//   let celtofahTemp = document.querySelector("#maintemp");
//   celtofahTemp.innerHTML = Math.round(celsciusTemp);
// }

// forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = date.getDay();

  return days[day];
}

function displayForecast(response) {
  let forecastData = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = ``;
  // let days = ["Fri", "Sat", "Sun", "Mon", "Tues", "Wed", "Thurs"];
  forecastData.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
  <div id="forecast" class="">
    <h5 class="text-center date">${formatDay(forecastDay.time)}</h5>
    <img src="${forecastDay.condition.icon_url}" class="w-75" alt="">
    <p class="text-center minmax">🔺<span class="forecast-max">${Math.round(
      forecastDay.temperature.maximum
    )}</span>, 🔻<span class="forecast-min">${Math.round(
        forecastDay.temperature.minimum
      )}</span></p>
  </div>`;
  });

  // forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;

  let latitude = document.querySelector("#latitude");
  latitude.innerHTML = response.data.coordinates.latitude;
  let longitude = document.querySelector("#longitude");
  longitude.innerHTML = response.data.coordinates.longitude;
}

// current-position
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b64318e94d52af1eebd0bbbbcb9290b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

// creating global variable
// let celsciusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// temperature convert
// let fahrenTemp = document.querySelector("#fahlink");
// fahrenTemp.addEventListener("click", displayFahTemp);

// let celsTemp = document.querySelector("#cellink");
// celsTemp.addEventListener("click", displayCelTemp);

let searchCurrent = document.querySelector("#current");
searchCurrent.addEventListener("click", getCurrentLocation);

search("Bangkok");
