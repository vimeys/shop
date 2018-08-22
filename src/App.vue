<template>
  <div id="app">
      <ys-nav @chooseNav="chooseNav"></ys-nav>
    <div class="main" v-if="loginType">
      <steps :navList="client"></steps>
      <router-view/>
    </div>
    <div v-else>
      <ys-login @login="login">

      </ys-login>
    </div>

  </div>
</template>

<script>
  import steps from "./components/steps";
  import  ysNav from './components/header'
  import  {client,shopSetting,accountSetting,clientManage,fodderCenter,moneyManage,dataView} from './assets/script/stepsData'
  import  ysLogin from './page/login/login'
export default {
  name: 'App',
  components: {
    steps,
    ysNav,
    ysLogin
  },
  data(){
    return {
      client:shopSetting,
      loginType:false,
      phone:'',
      psw:''
    }
  },
  methods:{
    chooseNav(index){
      let that=this
      switch (index) {
        case 0:
          that.client=shopSetting;
          break
        case 1:
          that.client=moneyManage;
          break
        case 2:
          that.client=clientManage;
          break
        case 3:
          that.client=client;
          break
        case 4:
          that.client=dataView;
          break
        case 5:
          that.client=fodderCenter;
          break
        case 6:
          that.client=accountSetting;
          break;
      }
    },
    login(e){
      this.loginType=true
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


