<template>
  <div id="main" v-bind:class="isDay ? 'day' : 'night'">
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

      <p class="text-center my-3" v-if="cityNotFound">No city found</p>

      <div
        class="card rounded-10 my-3 shadow-lg back-card overflow-hidden"
        v-if="visible"
      >
        <div>
          <div icon="sunny" v-if="clearSky">
            <span class="sun"></span>
          </div>

          <div icon="snowy" v-if="snowy">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>

          <div icon="stormy" v-if="stormy">
            <span class="cloud"></span>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>

          <div icon="cloudy" v-if="cloudy">
            <span class="cloud"></span>
            <span class="cloud"></span>
          </div>

          <div icon="nightmoon" v-if="clearNight">
            <span class="moon"></span>
            <span class="meteor"></span>
          </div>
        </div>

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
        <div class="card-body tempContainer">
          <!--card middle starts here -->
          <div class="row">
            <weather-item
              :value="weather.temperature"
              type="temp"
              :description="weather.description"
              size="large"
            ></weather-item>
          </div>
          <div class="row">
            <div class="col d-flex justify-content-between px-5 mx-5">
              <div class="d-flex align-items-center">
                <img src="./assets/down.svg" alt="Down" class="mx-1" />
                <weather-item
                  :value="weather.lowTemp"
                  type="temp"
                  size="small"
                ></weather-item>
              </div>
              <div class="d-flex align-items-center">
                <img src="./assets/up.svg" alt="Up" class="mx-1" />
                <weather-item
                  :value="weather.highTemp"
                  type="temp"
                  size="small"
                ></weather-item>
              </div>
            </div>
          </div>
          <!-- card middle ends here -->

          <!-- card bottom starts here -->
          <div class="px-5 py-4 row">
            <div class="col">
              <weather-item
                :value="weather.feelsLike"
                type="temp"
                description="Feels like"
                size="medium"
              ></weather-item>
            </div>

            <div class="col">
              <weather-item
                :value="weather.humidity"
                type="percent"
                description="Humidity"
                size="medium"
              ></weather-item>
            </div>
          </div>

          <!-- card bottom ends here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import WeatherItem from './components/WeatherItem.vue';

  export default {
    data() {
      return {
        visible: false,
        isDay: true,
        citySearch: '',
        cityNotFound: false,

        stormy: false,
        cloudy: false,
        clearSky: false,
        clearNight: false,
        snowy: false,

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
      WeatherItem,
    },
    methods: {
      async getWeather() {
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

          this.stormy =
            mainWeather.includes('Thunderstorm') ||
            mainWeather.includes('Rain');
          this.cloudy =
            mainWeather.includes('Clouds') || mainWeather.includes('Mist');
          this.clearSky = mainWeather.includes('Clear') && this.isDay;
          this.clearNight = mainWeather.includes('Clear') && !this.isDay;
          this.snowy = mainWeather.includes('Snow');

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
  @import './assets/animation.css';
</style>
