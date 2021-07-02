<template>
  <div class="navContainer">
    <navigation></navigation>
  </div>
  <router-view />
</template>

<script>
  import Navigation from './components/Navigation.vue';

  export default {
    components: {
      Navigation,
    },
  };
</script>

<style lang="scss">
  .navContainer {
    position: absolute;
    right: 0;
  }
</style>
