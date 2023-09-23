const getWeather = async (cityProvided) => {

    let weatherImage = document.querySelector("#weatherIcon");

    let city = cityProvided
    const apiKey = "8313e9397d477560c4071df640d6a1fe";
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric";
    let data = await fetch(url);
    data = await data.json();
    console.log(data)
    let cityName = data.name;
    let temp = data.main.temp;
    let windSpeed = data.wind.speed;
    let humidity = data.main.humidity;
    let condition = data.weather[0].main;
    // alert(condition)

    if(condition=="Clouds") 
        weatherImage.src = "images/clouds.png";
    else if(condition == "Clear") 
        weatherImage.src = "images/clear.png";
    else if(condition == "Rain") 
    weatherImage.src = "images/rain.png";
    else if(condition == "Drizzle") 
    weatherImage.src = "images/drizzle.png";
    else if(condition == "Mist") 
        weatherImage.src = "images/mist.png";
    else if(condition == "Haze")
        weatherImage.src = "images/haze.png"
   

    document.querySelector(".cityName").innerHTML = cityName;
    document.querySelector(".temp").innerHTML = Math.round(temp) + "&nbsp;°C," +"&nbsp" + condition; 
    document.querySelector("#humidityValue").innerHTML = humidity + "&nbsp;%";
    document.querySelector("#windSpeedValue").innerHTML = windSpeed + "&nbsp;Km/hr"

    console.log(data.clouds)

}

document.querySelector("#search").addEventListener("click", () => {
    let mainSection = document.querySelector("#mainSection");
    mainSection.classList.add("active")
    let city = document.querySelector("#cityGiven").value;
    getWeather(city);
})


getWeather();