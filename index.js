const API_KEY = '582e4a592a05d366493424e26c60ffcb'

// fetch weather information from Open Weather API
async function fetchWeatherInfo(city = "Nairobi", API_KEY) {
    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        const data = res.json();


        const cloud_name = data.weather[0].main
        const cloud_description = data.weather[0].description
        const temp = data.main.temp
        const feels_like = data.main.feels_like
        const humidity = data.main.humidity
        const wind_speed = data.wind.speed

       return `The weather in ${city} is: 
       <ul>
       <li>Clouds: ${cloud_name}</li>
       <li>Cloud Description: ${cloud_description}</li>
       <li>Clouds: ${temp}</li>
       <li>Feels like: ${feels_like}</li>
       <li>Humidity: ${humidity}</li>
       <li>Wind Speed: ${wind_speed}</li>
       <ul>`
    }
    catch(err){
        console.error("ERROR:", err)
        return "Could not fetch weather information. Please try again." 
    }
    
}

// Form Handling

document.getElementById()