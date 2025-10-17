import { API_KEY } from "./config.js"


// const FSQ_API_KEY = 

// fetch weather information from Open Weather API
async function fetchWeatherData(city = "Nairobi", API_KEY) {
    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        const data = await res.json();


        const cloud_name = data.weather[0].main
        const cloud_description = data.weather[0].description
        const temp = data.main.temp
        const feels_like = data.main.feels_like
        const humidity = data.main.humidity
        const wind_speed = data.wind.speed

       const container = document.createElement("div") 
        
       
        const ul = document.createElement("ul")
        
        const items = [
            `Sky Conditions: ${cloud_name} (${cloud_description})`,
            `Temperature: ${temp}°C`,
            `Feels like: ${feels_like}°C`,
            `Humidity: ${humidity}%`,
            `Wind Speed: ${wind_speed} m/s`
        ]
        
        items.forEach(text => {
            const li = document.createElement("li")
            li.textContent = text
            ul.appendChild(li)
        })

        container.appendChild(ul)
        
        return container
    }
    catch(err){
        console.error("ERROR:", err)
        return "Could not fetch weather information. Please try again." 
    }
    
}

function displayWeatherData(){
    const todayDate = new Date();
    const date = document.getElementById("today-date")
    date.innerHTML = todayDate.toLocaleDateString();

    console.log(todayDate)


    const weatherBody = document.getElementById("current-weather-result")
    // weatherBody.innerHTML = '
    // '

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

