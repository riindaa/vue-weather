<template>
  <div id="nav">
    <router-link to="/">{{ $t('message.menuSearchWeather') }}</router-link> |
    <router-link to="/about">{{ $t('message.menuAbout') }}</router-link>
    <select class="localeChanger form-select" v-model="$i18n.locale">
      <option
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
        >{{ locale }}</option
      >
    </select>
  </div>
</template>

<style lang="scss">
  #nav {
    padding: 30px;
    text-align: right;
    color: #888;
    display: flex;
    align-items: center;

    a {
      font-weight: bold;
      color: #fff;
      margin: 0 20px 0 20px;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
    .localeChanger {
      width: fit-content;
      margin-left: 20px;
    }
  }
</style>
