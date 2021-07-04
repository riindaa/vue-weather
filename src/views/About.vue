<template>
  <div class="About">
    <div class="container">
      <h1>{{ $t('message.about') }}</h1>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss">
  .About {
    min-height: 100vh;
    padding-top: 85px;
    background: linear-gradient(to bottom left, #4854a2, #3d3d3d);
    color: white;
  }
</style>
