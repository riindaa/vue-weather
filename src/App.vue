<template>
  <div id="main" v-bind:class="isDay ? 'day' : 'night'">
    <div class="container my-5">
      <h1 class="title text-center">Weather in</h1>

      <search-input
        placeholderLabel="What City?"
        @onSubmit="getWeather"
      ></search-input>

      <p class="text-center my-3" v-if="cityNotFound">No city found</p>

      <div v-if="visible">
        <weather-card
          :cityName="weather.cityName"
          :country="weather.country"
          :temperature="weather.temperature"
          :description="weather.description"
          :lowTemp="weather.lowTemp"
          :highTemp="weather.highTemp"
          :feelsLike="weather.feelsLike"
          :humidity="weather.humidity"
          :weatherAnimation="weatherAnimation"
        ></weather-card>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchInput from './components/SearchInput.vue';
  import WeatherCard from './components/WeatherCard.vue';

  export default {
    data() {
      return {
        visible: false,
        isDay: true,
        citySearch: '',
        cityNotFound: false,

        weatherAnimation: 'Clouds',

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
    components: {
      SearchInput,
      WeatherCard,
    },
    methods: {
      async getWeather(value) {
        this.citySearch = value;

        if (!this.citySearch) {
          return;
        }

        const key = process.env.VUE_APP_OPENWEATHER_API_KEY;
        const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${this.citySearch}&units=metric&appid=${key}`;

        // fetch weather
        try {
          const response = await fetch(baseURL);
          const data = await response.json();

          const { name, sys, main, weather } = data;
          const {
            temp,
            temp_min: tempMin,
            temp_max: tempMax,
            feels_like: feelsLike,
            humidity,
          } = main;

          this.citySearch = '';
          this.weather.cityName = name;
          this.weather.country = sys.country;
          this.weather.description = weather[0].description;
          this.weather.temperature = Math.round(temp);
          this.weather.lowTemp = Math.round(tempMin);
          this.weather.highTemp = Math.round(tempMax);
          this.weather.feelsLike = Math.round(feelsLike);
          this.weather.humidity = Math.round(humidity);

          // check for time of day
          const timeOfDay = data.weather[0].icon;
          this.isDay = !timeOfDay.includes('n');

          // show weather card when enter city
          this.visible = true;

          // check weather animation
          const mainWeather = weather[0].main;

          this.weatherAnimation =
            mainWeather.includes('Clear') && !this.isDay
              ? 'ClearNight'
              : mainWeather;

          this.cityNotFound = false;
        } catch (error) {
          console.log(error);
          this.cityNotFound = true;
          this.citySearch = '';
          this.visible = false;
        }
      },
    },
  };
</script>

<style>
  @import './assets/custom.css';
</style>
