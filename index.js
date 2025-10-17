import { API_KEY, FSQ_API_KEY } from "./config.js"

fsqBaseUrl = 'https://api.foursquare.com/v3/places/'


// fetch current weather information from Open Weather API
async function fetchWeatherData(city, API_KEY) {
    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        const data = await res.json();

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
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
        if(!res.ok){
            throw new Error(`Forecast not found for:${city}`)
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
        console.error("Forecast ERROR:", err)
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

        const forecastItem = document.createElement('li')
        forecastItem.className = 'col-xs-4 col-sm-2 text-center'
        forecastItem.innerHTML = `
            <h3 class="h5">${dayName}</h3>
            <p>
                <br />${tempMin}°/${tempMax}°
            </p>
        `

        forecastContainer.appendChild(forecastItem)
    });

} 

// Form Handling
document.getElementById("weather-form").addEventListener("submit", async (e) => {
    e.preventDefault()

    const city  = document.getElementById("city-input").value.trim()
    await fetchWeatherData(city, API_KEY);
    await fetchForecastData(city, API_KEY);
   
})


//fetch data 
window.addEventListener('DOMContentLoaded', async () => {
    const defaultCity = "Nairobi"
    await fetchWeatherData(defaultCity, API_KEY)
    await fetchForecastData(defaultCity, API_KEY)
})


// Fetch Activity Information from Foursquare API

async function fetchActivity(FSQ_API_KEY) {
    try{
        const res = await fetch()

    }
    catch(err){
        console.error("ERROR:", err)
        return "Could not fetch weather information. Please try check city name." 
    }
    
}

document.getElementById("forecast-btn").addEventListener("onClick", async (e) => {
 e.preventDefault()


})