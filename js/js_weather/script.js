const apikey = '7ce486ddd2addfdcce95f96ced0b72b4';
const apiUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat='

let lat
let lon

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const tempElement = document.getElementById('temperature');
const descElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        getLocation(location);
    }
});

function getLocation(location) {
    const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apikey}`;

    fetch(locationUrl)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            lon = data[0].lon;
            lat = data[0].lat;

            console.log("Longitude", lon);
            console.log("Latitude", lat);
            
            fetchWeather(lat, lon);
        })

        .catch(error => {
            console.error('Error fetching location data:', error);
        });
    
    }


function fetchWeather(lat, lon) {
    const url = `${apiUrl}${lat}&lon=${lon}&appid=${apikey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            tempElement.textContent = `${Math.round(data.current.temp)}°C`;
            descElement.textContent = data.current.description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
