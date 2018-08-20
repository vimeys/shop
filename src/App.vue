<template>
  <div id="app">


      <ys-nav @chooseNav="chooseNav"></ys-nav>

    <div class="main">
      <steps :navList="client"></steps>
      <router-view/>
    </div>

  </div>
</template>

<script>
  import steps from "./components/steps";
  import  ysNav from './components/header'
  import  {client,shopSetting,accountSetting,clientManage} from './assets/script/stepsData'
export default {
  name: 'App',
  components: {
    steps,
    ysNav
  },
  data(){
    return {
      client:shopSetting
    }
  },
  methods:{
    chooseNav(index){
      let that=this
      switch (index) {
        case 0:
          that.client=shopSetting;
          console.log(shopSetting);
          console.log(accountSetting);
          break
        case 2:
          that.client=clientManage;
          console.log(that.client);
          break
        case 3:
          that.client=client;
          console.log(that.client);
          break
        case 4:
          that.client=accountSetting;
          console.log(that.client);
          break
      }
    }
  },
  created(){
    // console.log(shopSetting);

  },
  watch:{
      client:function(){
        console.log(this.client);
      }
  }
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


