<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<steps></steps>-->
    <router-view/>
    <router-link to="active">123</router-link>
  </div>
</template>

<script>
  import steps from "./components/steps";
export default {
  name: 'App',
  components: {
    steps
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: #F9F9F9;
}
</style>
