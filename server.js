const express = require('express');
const app = express();
const port = 8080;

// Serve static files (index.html, JS, CSS) from the 'public' folder
app.use(express.static('public'));  // 'public' folder for front-end files

// Weather data mock
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
    // Add other cities as needed...
};

// Weather API route
app.get('/weather/:city', (req, res) => {
    const city = req.params.city;
    const data = mockWeatherData[city];
    if (data) {
        res.json(data);
    } else {
        res.status(404).send({ message: 'City not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
