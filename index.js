import { API_KEY, FSQ_API_KEY } from "./config.js"

const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather'

const fsqBaseUrl = 'https://api.foursquare.com/v3/places/search'

// fetch current weather information from Open Weather API
async function fetchWeatherData(openWeatherUrl, city, API_KEY) {
    try{
        const res = await fetch(`${openWeatherUrl}?q=${city}&appid=${API_KEY}&units=metric`)
        const data = await res.json();

        document.getElementById('city-name').innerHTML = `${data.name}, ${data.sys.country}<br /><small id="today-date">${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</small>`;
        document.getElementById('weather-condition').innerHTML = `${data.weather[0].main}`;
        document.getElementById('current-temp').textContent = `${Math.round(data.main.temp)}°`;
        document.getElementById('temp-range').textContent = `${Math.round(data.main.temp_min)}° / ${Math.round(data.main.temp_max)}°`;
        // const humidity = Math.round(day.main.humidity)
        // const windSpeed = Math.round(day.wind.speed)
        
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

// Display five day forecast
function displayForecast(forecasts){
    const forecastContainer = document.querySelector('.forecast')
    forecastContainer.innerHTML = '';


    forecasts.forEach(day => {
        const date = new Date(day.dt * 1000)
        const dayName = date.toLocaleDateString('en-US', {weekday : 'long'})

        const temp = Math.round(day.main.temp)
        const tempMin = Math.round(day.main.temp_min)
        const tempMax = Math.round(day.main.temp_max)
        const weather = day.weather[0].main

        const forecastItem = document.createElement('li')
        forecastItem.className = 'col-xs-4 col-sm-2 text-center'
        forecastItem.dataset.day = dayName;
        forecastItem.dataset.weather = weather;
        forecastItem.innerHTML = `
            <h3 class="h5">${dayName}</h3>
            <p>
                <br />${tempMin}°/${tempMax}°
            </p>
        `

        forecastContainer.appendChild(forecastItem)
    });

    document.querySelectorAll(".forecast-day").forEach(item => {
        item.addEventListener("onClick", async () => {
            const day = item.dataset.day
            const weather = item.dataset.weather
            const city = document.getElementById('city-input').value.trim() || 'Nairobi'

            await fetchActivity(city, day, weather)
        })
    })

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



// Activity


// Fetch Activity Information from Foursquare API

const activityCategory = {
Clear: ["park", "outdoor cafe", "scenic view"],
Clouds: ["art gallery", "coffee shop", "shopping mall"],
Rain: ["museum", "indoor gym", "cinema"],
Snow: ["indoor restaurant", "spa", "theater"],
Thunderstorm: ["museum", "arcade", "bookstore"],
Drizzle: ["coffee shop", "library", "indoor market"],
Mist: ["museum", "aquarium"],
};

async function fetchActivity(city, day, weather) {
    try{
        const res = await fetch(`${fsqBaseUrl}?near=${city}&query=${query}&limit=5`, { 
            headers: {
            Accept: 'application/json',
            'X-Places-Api-Version': '1970-01-01',
            Authorization: FSQ_API_KEY 
        }}
        )
        .then(res => res.json())

        if(!res.ok){
            throw new Error(`Error fetching data: ${res.status}`)
        }
        const data = await res.json()
       


    }
    catch(err){
        console.error("ERROR:", err)
        return "Could not fetch weather information. Please try check city name." 
    }
    
}
