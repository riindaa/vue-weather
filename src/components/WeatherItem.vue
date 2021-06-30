<template>
  <div class="WeatherItem">
    <div :class="[value, getSize()]">{{ value }}{{ getTypeSuffix() }}</div>
    <div :class="getDescriptionSize()">{{ description }}</div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      value: {
        type: Number,
        require: true,
      },
      description: {
        type: String,
      },
      type: {
        type: String,
        require: true,
        validator(typeValue) {
          return ['temp', 'percent'].includes(typeValue);
        },
      },
      size: {
        type: String,
        require: true,
        validator(sizeValue) {
          return ['small', 'medium', 'large'].includes(sizeValue);
        },
      },
    },
    methods: {
      getTypeSuffix() {
        return this.type === 'temp' ? '°C' : '%';
      },
      getSize() {
        const classesBySize = {
          small: 'small',
          medium: 'medium',
          large: 'large',
        };

        return classesBySize[this.size] || '';
      },
      getDescriptionSize() {
        const descriptionClassesBySize = {
          small: 'small-description',
          medium: 'medium-description',
          large: 'large-description',
        };

        return descriptionClassesBySize[this.size] || '';
      },
    },
  });
</script>

<style lang="scss">
  .WeatherItem {
    text-align: center;
    line-height: 1.2;

    .value {
      font-weight: 100;
      letter-spacing: -5px;
      white-space: nowrap;
    }

    .large {
      font-size: 5em;
    }

    .medium {
      font-size: 3em;
    }

    .small {
      font-size: 1em;
    }

    .large-description {
      font-size: 1.2em;
    }

    .medium-description {
      font-size: 1em;
    }

    .small-description {
      font-size: 0.8em;
    }
  }
</style>
