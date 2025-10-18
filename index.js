import { API_KEY, GEOAPIFY_API_KEY } from "./config.js"


// fetch current weather information from Open Weather API
async function fetchWeatherData(city, API_KEY) {
    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
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
        const dayName = date.toLocaleDateString('en-US', {weekday : 'short'})

        const temp = Math.round(day.main.temp)
        const tempMin = Math.round(day.main.temp_min)
        const tempMax = Math.round(day.main.temp_max)
        const weather = day.weather[0].main

        const forecastItem = document.createElement('li')
        forecastItem.className = 'col-xs-4 col-sm-2 text-center'
        forecastItem.dataset.day = dayName;
        forecastItem.dataset.weather = weather;
        forecastItem.style.cursor = 'pointer'
        forecastItem.innerHTML = `
            <h3 class="h5">${dayName}</h3>
            <p>
                <br />${tempMin}°/${tempMax}°
            </p>
        `

        forecastItem.addEventListener("click", async () => {
            const city = document.getElementById('city-input').value.trim() || 'Nairobi'

            await fetchActivity(city, dayName, weather)
        })

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



// Activity


// Fetch Activity Information from Geoapify API

const activityCategory = {
    Clear: "leisure.park,tourism.attraction,sport",
    Clouds: "entertainment.museum,tourism.attraction,entertainment.culture",
    Rain: "entertainment.cinema,entertainment.museum,catering.restaurant,commercial.shopping_mall",
    Snow: "catering.restaurant,wellness.spa,entertainment.culture",
    Thunderstorm: "entertainment.museum,entertainment.culture,commercial.shopping_mall",
    Drizzle: "catering.cafe,commercial.bookstore,commercial.shopping_mall",
    Mist: "entertainment.museum,tourism.aquarium,entertainment.culture"
};



async function fetchActivity(city, day, weather) {
    const categories = activityCategory[weather] || 'tourism.attraction'

    try{
       
        const geocodeRes = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(city)}&limit=1&apiKey=${GEOAPIFY_API_KEY}`)
        const geocodeData = await geocodeRes.json()



        if(!geocodeData.features || geocodeData.features.length === 0){
            throw new Error(`City not found`)
        }

        const [lon, lat] = geocodeData.features[0].geometry.coordinates

        const res = await fetch(`https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},5000&limit=5&apiKey=${GEOAPIFY_API_KEY}`)

        if(!res.ok){
            throw new Error(`Error: ${res.status}`)
        }

        const data = await res.json()
      
       
        if(!data.features || data.features.length === 0){
            document.getElementById('activityModalLabel').textContent = `${day} Activities`
            document.getElementById('activity-content').innerHTML = `<p>No activities found for ${weather} weather in ${city}. Try a different city!</p>`
        }
        else {
            const activities = data.features.map(place => {
                    const name = place.properties.name || place.properties.address_line1 || 'Unnamed Place';
                    const category = place.properties.categories?.[0] || '';
                    return `<li><strong>${name}</strong>${category ? ` - ${category}` : ''}</li>`;
                })
                .join('');
            
            document.getElementById('activityModalLabel').textContent = `${day} Activities in ${city}`;
            document.getElementById('activity-content').innerHTML = `
                <p class="text-muted mb-3">Recommended activities for ${weather} weather:</p>
                <ul>${activities}</ul>
            `;
        }

        const modal = new bootstrap.Modal(document.getElementById('activityModal'))
        modal.show()




    }
    catch(err){
        console.error("Could not fetch activity:", err);
        document.getElementById('activityModalLabel').textContent = `Error`;
        document.getElementById('activity-content').innerHTML = `<p>Could not load activities. Please try again later.</p>`;
        const modal = new bootstrap.Modal(document.getElementById('activityModal'));
        modal.show();
    }
    
}