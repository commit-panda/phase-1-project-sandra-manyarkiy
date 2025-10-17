import { API_KEY } from "./config.js"


// const FSQ_API_KEY = 

// fetch current weather information from Open Weather API
async function fetchWeatherData(city, API_KEY) {
    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        const data = await res.json();


        // const cloud_name = data.weather[0].main
        // const cloud_description = data.weather[0].description
        // const temp = data.main.temp
        // const feels_like = data.main.feels_like
        // const humidity = data.main.humidity
        // const wind_speed = data.wind.speed

        document.getElementById('city-name').innerHTML = `${data.name}, ${data.sys.country}<br /><small id="today-date">${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</small>`;
        document.getElementById('weather-condition').innerHTML = `${data.weather[0].description}`;
        document.getElementById('current-temp').textContent = `${Math.round(data.main.temp)}°`;
        document.getElementById('temp-range').textContent = `${Math.round(data.main.temp_min)}° / ${Math.round(data.main.temp_max)}°`;
        
        return data
    }
    catch(err){
        console.error("ERROR:", err)
        return "Could not fetch weather information. Please try check city name." 
    }
    
}


// Fetch five-day forecast
async function fetchForecastData(city, API_KEY){
    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        if(!res.ok){
            throw new Error(`Forecast not found for:${error}`)
        }

        const data = await res.json()

        const dailyForecast = data.list.filter(item => {
            return item.dt_txt.includes('12:00:00')
        })

        const fiveDayForecast = dailyForecast.slice(0,5)

        displayForecast(fiveDayForecast)

        return data
    }
    catch(err){
        console.error()
    }
}

// display Forecast
function displayForecast(forecasts){
    const forecastContainer = document.querySelector('.forecast')
    forecastContainer.innerHTML = '';


    forecasts.forEach(day => {
        const date = new Date(day.dt * 1000)
        const dayName = date.toLocaleDateString('en-US', {weekday : 'short'})

        const temp = Math.round(day.main.temp)
        const tempMin = Math.round(day.main.temp_min)
        const tempMax = Math.round(day.main.temp_max)
        
        
    });

} 

// Form Handling
document.getElementById("weather-form").addEventListener("submit", async (e) =>{
    e.preventDefault()

    const city = document.getElementById("city-input").value.trim();
    const weatherText = await fetchWeatherData(city, API_KEY)

    const resultDiv = document.getElementById("current-weather-result")
    resultDiv.innerHTML = ""
    resultDiv.appendChild(weatherText) 

    const cityHeader = document.createElement("h2")
    cityHeader.textContent = `Weather in ${city}`
    resultDiv.prepend(cityHeader)
   
})

