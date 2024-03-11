// functions.js

const apiKey = 'ApiKey'; // Replace with your OpenWeatherMap API key
const url = 'https://api.openweathermap.org/data/2.5/weather?';

const locationSpan = document.getElementById('location');
const temperatureSpan = document.getElementById('temperature');
const descriptionSpan = document.getElementById('description');
const windSpeedSpan = document.getElementById('windSpeed');
const windDirectionSpan = document.getElementById('windDirection');
const weatherIcon = document.getElementById('weatherIcon');

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude.toFixed(3);
                const longitude = position.coords.longitude.toFixed(3);
                document.querySelector('#lat').innerHTML = latitude;
                document.querySelector('#lng').innerHTML = longitude;

                // Kutsu showWeather-funktiota saadulla sijainnilla
                showWeather(position);
            },
            error => {
                alert('Error retrieving location: ' + error.message);
            }
        );
    } else {
        alert("Your browser does not support geolocation!");
    }
}

function showWeather(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const address = `${url}lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    axios.get(address)
        .then(response => {
            const weatherData = response.data;
            locationSpan.textContent = weatherData.name;
            temperatureSpan.textContent = `${weatherData.main.temp} °C`;
            descriptionSpan.textContent = weatherData.weather[0].description;
            windSpeedSpan.textContent = `${weatherData.wind.speed} m/s`;
            windDirectionSpan.textContent = `${weatherData.wind.deg}°`;

            const iconCode = weatherData.weather[0].icon;
            weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}.png`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again later.');
        });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred.');
            break;
    }
}

// Call getLocation when the page loads
getLocation();
