/**
*   Created By  YS  on 2018/8/9
*/
<template>
    <div class="box">
      <ul class="header">
        <li v-for="(item,index) in nav" @click="href(index)">{{item.name}}</li>
      </ul>
    </div>
</template>

<script>
    import RouterLink from "vant/es/mixins/router-link";
    import {client,shopSetting,accountSetting,clientManage} from "../assets/script/stepsData";

    export default {
        name: "ysHeader",
      components: {RouterLink},
      data(){
          return {
            nav:[
              {name:'门店/员工管理',path:'/cardManage',active:true},
              {name:'财务管理',path:'/index',active:false},
              {name:'客户管理',path:'/cardManage',active:false},
              {name:'运营管理',path:'/cardManage',active:false},
              {name:'运营数据',path:'/cardManage',active:false},
              {name:'素材中心',path:'/cardManage',active:false},
              {name:'个人中心',path:'/cardManage',active:false},
            ]
          }
      },
      methods:{
          href(index){
              // let path=this.nav[index].path;
              // this.$router.push({path:path})
              this.$emit('chooseNav',index)
          }
      }
    }
</script>

<style lang='less' scoped>
  .header{
      width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #1a1a1a;
    li{
      flex: 1;
      color: #fff;
    }
  }

</style>
