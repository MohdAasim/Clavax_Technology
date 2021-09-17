<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  created(){
    this.$store.dispatch('getDirectory')
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 10px 10px 10px 10px;
}


</style>
