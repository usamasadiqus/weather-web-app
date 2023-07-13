const apiKey = "e6e1d510b6d648a7cab85669915cebde";
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const loader = document.getElementById("loader");

window.onload = function () {
  loader.style.display = "none";
  fetchAndUpdateWeatherData("karachi");
};

// Fetch weather data and update UI
async function fetchAndUpdateWeatherData(city) {
  loader.style.display = "block";
  try {
    const weatherData = await fetchWeatherData(city);
    updateWeatherUI(weatherData);
  } catch (error) {
    console.log("Error fetching weather data:", error);
  }
}

// Update UI with weather data
function updateWeatherUI(data) {
  const locationElement = document.getElementById("location");
  const temperatureElement = document.getElementById("temperature");
  const conditionElement = document.getElementById("condition");
  const weatherIconElement = document.getElementById("weather-icon");
  const windElement = document.getElementById("wind");
  const pressureElement = document.getElementById("pressure");
  const humidityElement = document.getElementById("humidity");
  const visibilityElement = document.getElementById("visibility");

  locationElement.textContent = data.name;
  temperatureElement.textContent = `${data.main.temp}°C`;
  conditionElement.textContent = data.weather[0].description;
  weatherIconElement.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  windElement.textContent = `${data.wind.speed} m/s`;
  pressureElement.textContent = `${data.main.pressure} hPa`;
  humidityElement.textContent = `${data.main.humidity}%`;
  visibilityElement.textContent = `${data.visibility / 1000} km`;

  loader.style.display = "none";
}

// Fetch weather data from API
async function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching weather data:", error);
  }
}

// Event listener for search button
searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    fetchAndUpdateWeatherData(city);
    cityInput.value = "";
  }
});
