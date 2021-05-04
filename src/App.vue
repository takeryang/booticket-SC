<template>
  <div id="app">
    <go-top :size="50" :bottom="60" weight="bold"></go-top>
    <router-view />
  </div>
</template>

<style lang="scss">
  @import "./assets/style/all";

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
<script>
  import GoTop from '@inotom/vue-go-top';
  
  export default {
    components: {
      GoTop
    }
  };
</script>