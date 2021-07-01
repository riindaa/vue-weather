<template>
  <div class="WeatherDailyCard card rounded-10 my-3 shadow-lg overflow-hidden">
    <weather-animation-background
      :type="dailyAnimation"
    ></weather-animation-background>

    <div class="DailyCardContent card-top text-center">
      <div>{{ date }}</div>

      <span>...</span>

      <weather-item
        :value="max"
        type="temp"
        description="Max"
        size="medium"
      ></weather-item>

      <weather-item
        :value="min"
        type="temp"
        description="Min"
        size="small"
      ></weather-item>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import WeatherItem from './WeatherItem.vue';
  import WeatherAnimationBackground from './WeatherAnimationBackground.vue';

  export default defineComponent({
    components: { WeatherItem, WeatherAnimationBackground },
    props: {
      date: {
        type: Number,
        required: true,
      },
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
      dailyAnimation: {
        type: String,
        required: true,
        validator(typeValue) {
          return [
            'Thunderstorm',
            'Rain',
            'Clouds',
            'Mist',
            'Clear',
            'Snow',
            'ClearNight',
          ].includes(typeValue);
        },
      },
    },
  });
</script>

<style lang="scss">
  .WeatherDailyCard {
    border-radius: 40px !important;
    color: white;
    background: linear-gradient(to bottom right, #707070, #434647);
    text-shadow: 2px 2px 2px #707070;
    width: 250px;
    min-width: 250px !important;
    height: 300px;

    .DailyCardContent {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 25px;
      z-index: 1;
      height: 100%;
    }
  }
</style>
