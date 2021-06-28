<template>
  <div id="main">
    <div class="container my-5">
      <h1 class="title text-center">Weather in</h1>
      <form class="seach-location" v-on:submit.prevent="getWeather">
        <input
          type="text"
          class="form-control text-muted form-rounded p-4 shadow-sm rounded-pill"
          placeholder="What City?"
          autocomplete="off"
          v-model="citySearch"
        />
      </form>

      <div class="card rounded-10 my-3 shadow-lg back-card overflow-hidden">
        <!-- Top of card starts here -->
        <div class="card-top text-center" style="margin-bottom: 15rem">
          <div class="city-name my-3">
            <p>{{ weather.cityName }}</p>
            <span>...</span>
            <p class="">{{ weather.country }}</p>
          </div>
        </div>
        <!-- top of card ends here -->

        <!-- card middle body -->
        <div class="card-body">
          <!--card middle starts here -->
          <div class="card-mid">
            <div class="row">
              <div class="col-12 text-center temp">
                <span>{{ weather.temperature }}°C</span>
                <p class="my-4">{{ weather.description }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col d-flex justify-content-between px-5 mx-5">
                <p>
                  <img src="./assets/down.svg" alt="Down" />
                  {{ weather.lowTemp }}°C
                </p>
                <p>
                  <img src="./assets/up.svg" alt="Up" />
                  {{ weather.highTemp }}°C
                </p>
              </div>
            </div>
          </div>
          <!-- card middle ends here -->

          <!-- card bottom starts here -->
          <div class="card-bottom px-5 py-4 row">
            <div class="col text-center">
              <p>{{ weather.feelsLike }}°C</p>
              <span>Feels like</span>
            </div>
            <div class="col text-center">
              <p>{{ weather.humidity }}%</p>
              <span>Humidity</span>
            </div>
          </div>

          <!-- card bottom ends here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        citySearch: '',
        weather: {
          cityName: 'Vientiane',
          country: 'LAOS',
          temperature: 28,
          description: 'Clouds everywhere',
          lowTemp: 19,
          highTemp: 30,
          feelsLike: 20,
          humidity: 55,
        },
      };
    },
    methods: {
      async getWeather() {
        const key = 'a4eedb161bb17445342e96edc3f052ef';
        const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${this.citySearch}&units=metric&appid=${key}`;

        const response = await fetch(baseURL);
        const data = await response.json();

        this.citySearch = '';
        this.weather.cityName = data.name;
        this.weather.country = data.sys.country;
        this.weather.temperature = Math.round(data.main.temp);
        this.weather.description = data.weather[0].description;
        this.weather.lowTemp = Math.round(data.main.temp_min);
        this.weather.highTemp = Math.round(data.main.temp_max);
        this.weather.feelsLike = Math.round(data.main.feels_like);
        this.weather.humidity = Math.round(data.main.humidity);
      },
    },
  };
</script>

<style>
  @import './assets/custom.css';
</style>
