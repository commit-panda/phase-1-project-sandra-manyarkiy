# WeatherMate

**WeatherMate** is a weather forecasting application that provides the current weather conditions and the forecast for the next five days. It also suggests activities based on the weather conditions for a selected day.

---

## 🌦️ Features

- **Current Weather**: Displays the current weather (temperature)
- **Five-Day Forecast**: Shows a 5-day weather forecast.
- **Activity Suggestions**: Click on any day's forecast to see recommended activities based on the weather.

---

## 🔧 Technologies Used

- **OpenWeather API** – for real-time weather data and forecasts.
- **Geoapify API** – for geolocation and place search functionality.
- **HTML, CSS, JavaScript**
- **Live Server (VS Code)** – for local development and testing.

---

## 🚀 Installation

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/weatherapp.git
cd weatherapp
```


Create a config.js file in the root of your project and add the following:

```bash
const config = {
  OPENWEATHER_API_KEY: "your_openweather_api_key",
  GEOAPIFY_API_KEY: "your_geoapify_api_key",
};

export default config;
```


Replace "your_openweather_api_key" and "your_geoapify_api_key" with the respective keys from the APIs.

### Live Server Setup:

Install the Live Server extension in Visual Studio Code (VS Code) for real-time preview.

Open VS Code and go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or press Ctrl+Shift+X.

Search for Live Server and click Install on the first result.

Once installed, right-click on the index.html file and select Open with Live Server.

This will launch the app at:

```http://127.0.0.1:5503/```

### Usage

- Open the app in your browser (via Live Server).

- Input your city name or allow the app to access your location.

- The current weather for the day is displayed at the top.

- Below that, you will see the weather forecast for the next 5 days.

- Click on any of the days in the forecast to get suggestions for activities based on the expected weather for that day.

## 🔗 API Details
### OpenWeather API

The OpenWeather API provides weather data, including current conditions and 5-day forecasts. You will need to sign up for an API key at OpenWeather
.

Key features used in this app:

Current weather: https://api.openweathermap.org/data/2.5/weather

5-day forecast: https://api.openweathermap.org/data/2.5/forecast

### Geoapify API

The Geoapify API is used to convert a city name or geographical coordinates into the correct latitude and longitude. This helps ensure that the weather data retrieved from OpenWeather is accurate based on the user’s location.

API endpoint for Geoapify:

https://api.geoapify.com/v1/geocode/search

Note: Make sure to add your API key to config.js as described in the installation steps.

## Activity Suggestions

This app uses a simple set of weather conditions to suggest activities. Based on the temperature, wind speed, and precipitation, users will receive personalized suggestions, such as:

Clear Skies: "Go for a hike" or "Take a walk in the park."

Rain: "Stay indoors and read a book" or "Watch a movie."

Snow: "Skiing or snowboarding" or "Make a snowman."

Windy: "Fly a kite" or "Go for a bike ride."

You can extend this functionality by adding more complex suggestions based on additional weather parameters.

## License

This project is licensed under the MIT License - see the LICENSE
 file for details.

## Credits

OpenWeather

Geoapify