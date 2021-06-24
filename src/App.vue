<template>
  <div id="main">
    <div class="container my-5">
      <h1 class="title text-center">Weather in</h1>
      <form class="seach-location">
        <input
          type="text"
          class="form-control text-muted form-rounded p-4 shadow-sm rounded-pill"
          placeholder="What City?"
          autocomplete="off"
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
  };
</script>

<style>
  @import './assets/custom.css';
</style>
