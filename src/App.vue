<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import '~@/assets/style/reset.scss';
  @import "~@/assets/style/helper.scss";
body {
  font-family: $font-hei;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  color: #333333;
  background: #f5f5f5;
}
#app{
  max-width: 500px;
  margin: 0 auto;
}

</style>
<script>

  export default {

  }
</script>