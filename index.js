const API_KEY = '582e4a592a05d366493424e26c60ffcb'

// fetch weather information from Open Weather API
async function fetchWeatherInfo(city, API_KEY) {
    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        const data = res.json();

        console.log(data)

    }
    catch {
        
    }
    
}