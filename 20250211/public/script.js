// fetch('/api/config')
//   .then((response) => response.json())
//   .then((data) => {
//     console.log('API_KEY', data.apiKey);
//   })
//   .catch((error) => console.error('Error:', error));

document.addEventListener('DOMContentLoaded', async () => {
  const cityInput = document.getElementById('cityInput');
  const searchButton = document.getElementById('searchButton');
  const loadingMessage = document.getElementById('loadingMessage');
  const errorMessage = document.getElementById('errorMessage');
  const container = document.getElementById('weatherInfo');
  const cityName = document.getElementById('cityName');
  const temperature = document.getElementById('temperature');
  const humidity = document.getElementById('humidity');
  const weatherDescription = document.getElementById('weatherDescription');

  //ここにasyncが必要
  async function getApiKey() {
    //server.jsを利用してapiKeyを環境変数から持ってくる
    try {
      const response = await fetch('/api/config');

      if (!response.ok) {
        throw new Error('ネットワークエラー');
      }

      const data = await response.json();
      console.log(data);

      return data.apiKey;
    } catch (error) {
      console.error('データ取得失敗', error);
    }
  }

  const apiKey = await getApiKey(); //awaitが必要

  async function getWeatherData(city, api_key) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
      );

      if (!response.ok) {
        throw new Error('ネットワークエラー');
      }

      const data = await response.json(); //オブジェクトに変換
      console.log(data);

      return data;
    } catch (error) {
      console.error('データ取得失敗', error);
    }
  }

  const setDataToDom = (data) => {
    cityName.textContent = data.name;
    temperature.textContent = data.main.temp - 273.15;
    humidity.textContent = data.main.humidity;
    weatherDescription.textContent = data.weather[0].description;
    container.style.display = 'block';
  };

  searchButton.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (city === '') {
      return;
    }

    const data = await getWeatherData(city, apiKey);

    setDataToDom(data);
  });
});
