import { createI18n } from 'vue-i18n';

const messages = {
  fr: {
    message: {
      // About.vue
      about: 'Application créée par S. SIVILAY',
      // WeatherSearch.vue
      weatherIn: 'Météo à',
      placeholderLabel: 'Quelle Ville ?',
      findCity: 'Aucune ville trouvée',
      // Navigation.vue
      menuSearchWeather: 'Recherche la météo de ta ville',
      menuAbout: 'A propos',
      // WeatherCard.vue
      feelsLike: 'Ressenti',
      humidity: 'Humidité',
    },
  },
  en: {
    message: {
      // About.vue
      about: 'App made by S. SIVILAY',
      // WeatherSearch.vue
      weatherIn: 'Weather in',
      placeholderLabel: 'What City?',
      findCity: 'No city found',
      // Navigation.vue
      menuSearchWeather: "Search your City's weather",
      menuAbout: 'About',
      // WeatherCard.vue
      feelsLike: 'Feels like',
      humidity: 'Humidity',
    },
  },
};

const i18n = createI18n({
  locale: 'fr',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
