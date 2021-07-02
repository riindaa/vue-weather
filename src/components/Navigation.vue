<template>
  <div id="nav">
    <router-link to="/">Search your Weather City</router-link> |
    <router-link to="/about">About</router-link>
  </div>
</template>

<style lang="scss">
  #nav {
    padding: 30px;
    text-align: right;
    color: #888;

    a {
      font-weight: bold;
      color: #fff;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
