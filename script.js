document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('weatherForm');
  const locationInput = document.getElementById('location');
  const weatherInfo = document.getElementById('weatherInfo');
  const locationName = document.getElementById('locationName');
  const temperature = document.getElementById('temperature');
  const condition = document.getElementById('condition');
  const weatherIcon = document.getElementById('weatherIcon');

  form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent form from submitting the traditional way
      const location = locationInput.value;

      // Call your weather API here
      fetchWeather(location);
  });

  function fetchWeather(location) {
      const apiKey = 'f1567d4e7e86474b863164130241509'; // Your Weather API key
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

      fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              const locationData = data.location.name;
              const temperatureData = data.current.temp_c;
              const conditionData = data.current.condition.text.toLowerCase();

              locationName.textContent = `Location: ${locationData}`;
              temperature.textContent = `Temperature: ${temperatureData}°C`;
              condition.textContent = `Condition: ${conditionData}`;
              weatherInfo.style.display = 'block';

              updateWeatherIcon(conditionData);
          })
          .catch(error => {
              console.error('Error fetching weather data:', error);
              alert('Unable to retrieve weather data. Please try again.');
          });
  }

  function updateWeatherIcon(condition) {
      // Reset the icon class list
      weatherIcon.className = 'fas';

      if (condition.includes('sunny')) {
          weatherIcon.classList.add('fa-sun');
      } else if (condition.includes('rain') || condition.includes('drizzle')) {
          weatherIcon.classList.add('fa-cloud-rain');
      } else if (condition.includes('cloud')) {
          weatherIcon.classList.add('fa-cloud');
      } else if (condition.includes('snow')) {
          weatherIcon.classList.add('fa-snowflake');
      } else if (condition.includes('storm') || condition.includes('thunder')) {
          weatherIcon.classList.add('fa-bolt');
      } else {
          // Default icon if the condition doesn't match
          weatherIcon.classList.add('fa-cloud-sun');
      }
  }
});
