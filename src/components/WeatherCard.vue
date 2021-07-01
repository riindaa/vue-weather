<template>
  <div class="WeatherCard card rounded-10 my-3 shadow-lg overflow-hidden">
    <weather-animation-background
      :type="weatherAnimation"
    ></weather-animation-background>

    <!-- Top of card starts here -->
    <div class="card-top text-center" style="margin-bottom: 15rem">
      <div class="cityName my-3">
        <p>{{ cityName }}</p>
        <span>...</span>
        <div class="date">{{ date }}</div>
        <p class="">{{ country }}</p>
      </div>
    </div>
    <!-- top of card ends here -->

    <!-- card middle body -->
    <div class="card-body tempContainer">
      <!--card middle starts here -->
      <div class="row">
        <weather-item
          :value="temperature"
          type="temp"
          :description="description"
          size="large"
        ></weather-item>
      </div>
      <div class="row">
        <div class="col d-flex justify-content-between px-5 mx-5">
          <div class="d-flex align-items-center">
            <img src="../assets/down.svg" alt="Down" class="mx-1" />
            <weather-item
              :value="lowTemp"
              type="temp"
              size="small"
            ></weather-item>
          </div>
          <div class="d-flex align-items-center">
            <img src="../assets/up.svg" alt="Up" class="mx-1" />
            <weather-item
              :value="highTemp"
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
            :value="feelsLike"
            type="temp"
            description="Feels like"
            size="medium"
          ></weather-item>
        </div>

        <div class="col">
          <weather-item
            :value="humidity"
            type="percent"
            description="Humidity"
            size="medium"
          ></weather-item>
        </div>
      </div>

      <!-- card bottom ends here -->
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import WeatherItem from './WeatherItem.vue';
  import WeatherAnimationBackground from './WeatherAnimationBackground.vue';

  export default defineComponent({
    props: {
      cityName: {
        type: String,
        required: true,
      },
      date: {
        type: Number,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      temperature: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      lowTemp: {
        type: Number,
        required: true,
      },
      highTemp: {
        type: Number,
        required: true,
      },
      feelsLike: {
        type: Number,
        required: true,
      },
      humidity: {
        type: Number,
        required: true,
      },
      weatherAnimation: {
        type: String,
        required: true,
        validator(weatherAnimationValue) {
          return [
            'Thunderstorm',
            'Rain',
            'Clouds',
            'Mist',
            'Clear',
            'Snow',
            'ClearNight',
          ].includes(weatherAnimationValue);
        },
      },
    },
    components: {
      WeatherItem,
      WeatherAnimationBackground,
    },
  });
</script>

<style lang="scss">
  .WeatherCard {
    border-radius: 40px !important;
    color: white;
    background: linear-gradient(to bottom right, #707070, #434647);
    text-shadow: 2px 2px 2px #707070;

    .cityName {
      position: absolute;
      width: 100%;
    }

    .cityName p {
      font-weight: 400;
      font-size: 2em;
    }

    .cityName span {
      position: relative;
      top: -50px;
      font-size: 40pt;
      font-family: 'Times New Roman', Times, serif;
    }

    .date {
      font-size: 1.5em;
    }

    .tempContainer {
      z-index: 1;
    }
  }
</style>
