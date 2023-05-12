// function formatDate(timestamp) {
//   let date = new Date(timestamp);

//   let days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   let day = days[date.getDay()];
//   return `${day}`;
// }
// function formatTime(timestamp) {
//   let date = new Date(timestamp);
//   let minutes = date.getMinutes();
//   if (minutes < 10) {
//     minutes = `0${minutes}`;
//   }
//   let hours = date.getHours();

//   if (hours < 10) {
//     hours = `0${hours} `;
//     return `${hours} : ${minutes} AM`;
//   }
//   if (10 <= hours && hours < 12) {
//     hours = `${hours}`;
//     return `${hours} : ${minutes} AM`;
//   }
//   if (hours >= 12) {
//     hours = `${hours}`;
//     return `${hours} : ${minutes} PM`;
//   }
// }

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

function displayFahTemp(event) {
  event.preventDefault();
  let convertedFahTemp = (celsciusTemp * 9) / 5 + 32;
  celsTemp.classList.remove("active");
  fahrenTemp.classList.add("active");
  let celtofahTemp = document.querySelector("#maintemp");
  celtofahTemp.innerHTML = Math.round(convertedFahTemp);
}

function displayCelTemp(event) {
  event.preventDefault();
  celsTemp.classList.add("active");
  fahrenTemp.classList.remove("active");
  let celtofahTemp = document.querySelector("#maintemp");
  celtofahTemp.innerHTML = Math.round(celsciusTemp);
}

// forecast
function displayForecast() {
  let forecast = document.querySelector("#forecast");
  let forecastHTML = ``;
  let days = ["Fri", "Sat", "Sun", "Mon", "Tues", "Wed", "Thurs"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div id="forecast" class="">
    <h5 class="text-center date">${day}</h5>
    <img src="https://openweathermap.org/img/wn/04d@2x.png" class="w-75 mx-auto ps-2" alt="">
    <p class="text-center minmax">🔺<span class="forecast-max">--</span>, 🔻<span class="forecast-min">--</span></p>
  </div>`;
  });

  // forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

displayForecast();

// creating global variable
let celsciusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// temperature convert
let fahrenTemp = document.querySelector("#fahlink");
fahrenTemp.addEventListener("click", displayFahTemp);

let celsTemp = document.querySelector("#cellink");
celsTemp.addEventListener("click", displayCelTemp);

search("Bangkok");
