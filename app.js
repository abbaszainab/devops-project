const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city");
const currentWeather = document.getElementById("current-weather");
const weeklyForecast = document.getElementById("weekly-forecast");
const weatherHighlights = document.getElementById("weather-highlights");

// Mock weather data
const mockWeatherData = {
    "New York": {
        current: {
            name: "New York",
            temp: 15,
            description: "Cloudy",
            windSpeed: 5,
            humidity: 75,
            sunrise: "6:15 AM",
            sunset: "7:45 PM",
        },
        forecast: [
            { day: "Monday", description: "Sunny", temp: 18 },
            { day: "Tuesday", description: "Cloudy", temp: 16 },
            { day: "Wednesday", description: "Rainy", temp: 14 },
            { day: "Thursday", description: "Sunny", temp: 20 },
            { day: "Friday", description: "Cloudy", temp: 17 },
            { day: "Saturday", description: "Rainy", temp: 15 },
            { day: "Sunday", description: "Sunny", temp: 21 },
        ],
    },
    London: {
        current: {
            name: "London",
            temp: 10,
            description: "Rainy",
            windSpeed: 8,
            humidity: 85,
            sunrise: "7:00 AM",
            sunset: "6:30 PM",
        },
        forecast: [
            { day: "Monday", description: "Rainy", temp: 9 },
            { day: "Tuesday", description: "Cloudy", temp: 11 },
            { day: "Wednesday", description: "Sunny", temp: 12 },
            { day: "Thursday", description: "Cloudy", temp: 10 },
            { day: "Friday", description: "Rainy", temp: 8 },
            { day: "Saturday", description: "Sunny", temp: 13 },
            { day: "Sunday", description: "Sunny", temp: 14 },
        ],
    },
    "New Delhi": {
        current: {
            name: "New Delhi",
            temp: 25,
            description: "Sunny with light winds",
            windSpeed: 4,
            humidity: 60,
            sunrise: "5:50 AM",
            sunset: "6:10 PM",
        },
        forecast: [
            { day: "Monday", description: "Sunny", temp: 26 },
            { day: "Tuesday", description: "Cloudy", temp: 27 },
            { day: "Wednesday", description: "Rainy", temp: 24 },
            { day: "Thursday", description: "Sunny", temp: 28 },
            { day: "Friday", description: "Cloudy", temp: 26 },
            { day: "Saturday", description: "Rainy", temp: 23 },
            { day: "Sunday", description: "Sunny", temp: 29 },
        ],
    },
};

// Fetch weather data from mock
function fetchWeatherData(city) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = mockWeatherData[city];
            if (data) resolve(data);
            else reject("City not found in mock data");
        }, 500); // Simulated delay
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
