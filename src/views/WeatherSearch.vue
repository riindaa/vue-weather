<template>
  <div id="main" v-bind:class="isDay ? 'day' : 'night'">
    <div class="container">
      <h1 class="title text-center">Weather in</h1>

      <search-input
        placeholderLabel="What City?"
        @onSubmit="getWeather"
      ></search-input>

      <p class="text-center my-3" v-if="cityNotFound">No city found</p>

      <div v-if="visible">
        <weather-card
          :cityName="weather.cityName"
          :date="currentDate"
          :country="weather.country"
          :temperature="weather.temperature"
          :description="weather.description"
          :lowTemp="weather.lowTemp"
          :highTemp="weather.highTemp"
          :feelsLike="weather.feelsLike"
          :humidity="weather.humidity"
          :weatherAnimation="weatherAnimation"
        ></weather-card>

        <div class="daily-cards">
          <weather-daily-card
            v-for="(item, index) in dailyList"
            :key="index"
            :date="item.date"
            :min="item.min"
            :max="item.max"
            :dailyAnimation="item.dailyAnimation"
          ></weather-daily-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import moment from 'moment';

  import SearchInput from '../components/SearchInput.vue';
  import WeatherCard from '../components/WeatherCard.vue';
  import WeatherDailyCard from '../components/WeatherDailyCard.vue';

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

        dailyList: [],
      };
    },
    components: {
      SearchInput,
      WeatherCard,
      WeatherDailyCard,
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
          const response = await axios.get(baseURL);
          const { data } = response;

          const { name, sys, main, weather, coord, dt } = data;

          const dailyURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${key}`;

          const responseDailyURL = await axios.get(dailyURL);

          this.dailyList = responseDailyURL.data.daily
            .filter((_item, index) => index !== 0)
            .map((item) => ({
              date: moment(item.dt * 1000).format('DD/MM'),
              min: Math.round(item.temp.min),
              max: Math.round(item.temp.max),
              dailyAnimation: item.weather[0].main,
            }));

          const {
            temp,
            temp_min: tempMin,
            temp_max: tempMax,
            feels_like: feelsLike,
            humidity,
          } = main;

          // current weather
          this.citySearch = '';
          this.weather.cityName = name;
          this.currentDate = moment(dt * 1000).format('DD/MM/YYYY');
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
  #main {
    height: 100%;
    width: 100%;
    min-height: 100vh;
    padding-top: 85px;
  }
  .day {
    background: linear-gradient(to bottom left, #d7d3ac, #ffffff);
  }
  .night {
    background: linear-gradient(to bottom left, #4854a2, #3d3d3d);
    color: white;
  }

  .title {
    font-size: 50px;
    font-weight: 500;
    padding: 20px 0;
  }

  .daily-cards {
    display: flex;
    justify-content: space-around;
    column-gap: 15px;
    flex-wrap: wrap;
  }
</style>
