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
  console.log(response.data);
  let mainTemp = document.querySelector("#maintemp");
  let mainCity = document.querySelector("#maincity");
  let mainDesc = document.querySelector("#maindesc");
  let mainHum = document.querySelector("#mainhumidity");
  let mainWind = document.querySelector("#mainwind");
  let mainDay = document.querySelector("#mainday");
  let mainTime = document.querySelector("#maintime");
  let mainemoji = document.querySelector("#bigemoji");
  mainTemp.innerHTML = Math.round(response.data.main.temp);
  mainCity.innerHTML = response.data.name;
  mainDesc.innerHTML = response.data.weather[0].description;
  mainHum.innerHTML = response.data.main.humidity;
  mainWind.innerHTML = response.data.wind.speed;
  mainemoji.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let apiKey = "b64318e94d52af1eebd0bbbbcb9290b0";
let city = "New York";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
