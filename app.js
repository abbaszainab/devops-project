const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city");
const currentWeather = document.getElementById("current-weather");
const weeklyForecast = document.getElementById("weekly-forecast");
const weatherHighlights = document.getElementById("weather-highlights");

// Fetch weather data from server
function fetchWeatherData(city) {
    return fetch(`/weather/${city}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .catch((err) => {
            console.error("Error:", err);
            alert("An error occurred. Please try again.");
        });
}

// Display current weather
function displayCurrentWeather(data) {
    const { name, temp, description, windSpeed } = data.current;
    currentWeather.innerHTML = `
        <div class="card text-center shadow">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Temperature: ${temp}°C</p>
                <p class="card-text">Weather: ${description}</p>
                <p class="card-text">Wind Speed: ${windSpeed} m/s</p>
            </div>
        </div>
    `;
}

// Display weekly forecast
function displayWeeklyForecast(data) {
    weeklyForecast.innerHTML = `
        <h3 class="text-center mb-4">7-Day Forecast</h3>
        <div class="row">
            ${data.forecast
            .map(
                (day) => `
                    <div class="col-md-2">
                        <div class="card shadow-sm">
                            <div class="card-body text-center">
                                <h6>${day.day}</h6>
                                <p>${day.description}</p>
                                <p>${day.temp}°C</p>
                            </div>
                        </div>
                    </div>
                `
            )
            .join("")}
        </div>
    `;
}

// Display weather highlights
function displayWeatherHighlights(data) {
    const { humidity, sunrise, sunset } = data.current;

    weatherHighlights.innerHTML = `
        <h3 class="text-center mb-4">Today's Highlights</h3>
        <div class="row text-center">
            <div class="col-md-4">
                <div class="highlight-card shadow-sm p-3">
                    <h5>Humidity</h5>
                    <p>${humidity}%</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="highlight-card shadow-sm p-3">
                    <h5>Sunrise</h5>
                    <p>${sunrise}</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="highlight-card shadow-sm p-3">
                    <h5>Sunset</h5>
                    <p>${sunset}</p>
                </div>
            </div>
        </div>
    `;
}

// Event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();

    fetchWeatherData(city)
        .then((data) => {
            displayCurrentWeather(data);
            displayWeeklyForecast(data);
            displayWeatherHighlights(data);
        })
        .catch((err) => alert(err));
});
