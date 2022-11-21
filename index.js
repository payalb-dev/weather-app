function formatedate(date) {
  date = new Date();
  let days = date.getDay();
  let minutes = date.getMinutes();
  if (minutes < 0) {
    minutes = `0${minutes}`;
  }
  let hours = date.getHours();
  if (hours < 0) {
    hours = `0${hours}`;
  }

  let Currentday = [
    "sunday",
    "Monday",
    "Tuesday ",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let Time = Currentday[days];

  return `${Time} ${hours}:${minutes}`;
}
let li = document.querySelector("#date");
let currentTime = new Date();
li.innerHTML = formatedate(currentTime);

function searchForm(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;

  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchForm);

function searchCity(city) {
  let apiKey = "ed238469f9b5e9d801834270e65449bc";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(weatherDisplay);
}

function weatherDisplay(response) {
  console.log(response.data.weather);

  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.name;
  let span = document.querySelector("#temperature");
  span.innerHTML = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
}
function currentLocation(position) {
  console.log(position);

  let apiKey = "ed238469f9b5e9d801834270e65449bc";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherDisplay);
}

function CurrentForm(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let button = document.querySelector("#current-location-button");
button.addEventListener("click", CurrentForm);
