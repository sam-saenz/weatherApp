let weather = {
    "apiKey": "31f653ca78d8f591aab943d3cf2d731f",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.weatherDisplay(data));
    },
    weatherDisplay: function(data) {
        const { name } = data;
        const { icon, description} = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed)
        document.querySelector(".location").innerText = "Weather in " + name;
        document.querySelector(".temperature").innerText = temp + "°F";
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".desc").innerText = description;
        document.querySelector(".humidity").innerText = humidity + "% Humidity";
        document.querySelector(".wind").innerText = speed + " mph Wind";
    }
};