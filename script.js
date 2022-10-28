let weather = {
    "apiKey": "31f653ca78d8f591aab943d3cf2d731f",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey)
            .then((response) => {
                if(response.ok) {
                    return response.json()
                }
                else if(response.status === 404) {
                    document.querySelector(".weather").classList.add("error")
                    return Promise.reject('error 404')
                }
                else {
                    return Promise.reject('some other error: ' + response.status)
                }
            })
            .then((data) => this.weatherDisplay(data));
    },
    weatherDisplay: function(data) {
        const { name } = data;
        const { icon, description} = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".location").innerText = "Weather in " + name;
        document.querySelector(".temperature").innerText = temp + "°F";
        //document.querySelector(".icon").src = "/img/" + icon + ".gif"
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".desc").innerText = description;
        document.querySelector(".humidity").innerText = humidity + "% Humidity";
        document.querySelector(".wind").innerText = speed + " mph Wind";
        document.querySelector(".weather").classList.remove("loading")
        document.querySelector(".weather").classList.remove("error")
    },
    searchLocation: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.searchLocation();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key == "Enter") {
        weather.searchLocation();
    }
});

weather.fetchWeather("San Diego")