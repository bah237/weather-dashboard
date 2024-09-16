// Select elements
const weatherInfo = document.getElementById('weatherInfo');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const conditionElement = document.getElementById('condition');
const button = document.getElementById('getWeather');

// Add event listener to the button
button.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

// Fetch weather data
function getWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const apiKey = 'f1567d4e7e86474b863164130241509'; // Replace with your Weather API key
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const location = data.location.name;
      const temperature = data.current.temp_c;
      const condition = data.current.condition.text;

      // Update the UI with the weather info
      locationElement.textContent = `Location: ${location}`;
      temperatureElement.textContent = `Temperature: ${temperature}°C`;
      conditionElement.textContent = `Condition: ${condition}`;
      weatherInfo.style.display = 'block';
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

// Handle geolocation errors
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}
