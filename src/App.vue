<template>
  <div id="app">


      <ys-nav></ys-nav>

    <div class="main">
      <steps></steps>
      <router-view/>
    </div>

  </div>
</template>

<script>
  import steps from "./components/steps";
  import  ysNav from './components/header'
export default {
  name: 'App',
  components: {
    steps,
    ysNav
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
  /*margin-top: 60px;*/
  background: #F9F9F9;
  display: flex;
  flex-direction: column;
}
  .main{
    display: flex;
  }
</style>


