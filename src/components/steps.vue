<template>
  <div class="cb-box">
      <div class="left">
        <div class="point " :class="{big:item.active}" v-for="item in navList"></div>
        <!--<div class="point"></div>-->
      </div>
      <div class="right">
        <router-link tag="div" class="text"
                     :to="item.router"
             @click="href(index,item.router)"
             :class="{big:item.active,}"
                     :key="index"
             v-for="(item,index) in selfNavList"
             >
          {{item.name}} <span class="el-icon-caret-right"></span>
        </router-link>
      </div>
  </div>
</template>

<script>
    // import RouterLink from "vant/packages/mixins/router-link";
    export default {
        name: "steps",
      components: {},
      props:{
        navList:{
          type:Array,
          default:function () {
            return [
              {
                name:'门店设置',
                active:true,
                router:'/shop/shopSetting'
              },
              {
                name:'员工管理',
                active:false,
                router:'/shop/staffSetting'
              },
            ]
          }

        }
      },
        data(){
           return {
             active:1,
             title:[{name:'素材中心',status:'wait' },{name:'素材中心',status:'error' },{name:'素材中心',status:'finish' }],
             selfNavList:this.navList
           }
        },
      methods:{
          href(i,router){
            // console.log(this.navList);
            this.navList.forEach((item,index)=>{
                item.active=false;
              if(i==index){
                item.active=true
              }
              this.$router.push({
                path:router
              })
            })
            // console.log(this.navList);
          }
      },

      watch:{
          navList:function () {
            this.selfNavList=this.navList,
              this.$router.push({
                path:this.selfNavList[0].router
              })
          }
      }
    }
</script>

<style lang="less">
  .cb-box{
    min-width: 360px;
    height: 100%;
    display: flex;
    flex-direction: row;
    .left{
      min-height: 900px;
      width: 1px;
      background: #D8D8D8;
      overflow: visible;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-left: 100px;
      .point{
        width: 9px;
        height: 9px;
        margin-top: 30px;
        border-radius: 50%;
        margin-left: -4px;
      }
      .big{
        width: 15px;
        height: 15px;
        margin-left: -7px;
      }
    }
    .right{
      font-size: 15px;
      .text{
        margin-top: 20px;
        margin-left: 10px;
        text-align: left;
      }

      .text:before{
        content: '●';
        font-size: 15px;
        color:#282822;
        margin-right: 20px;
        margin-left: -15px;
      }
      .big1:before{
        content: '●';
        font-size: 31px;
        color:#FFD73A;
        margin-left: -20px;
      }
      .big1{
        font-size: 20px;
      }
      .active{
        font-size: 20px;
      }
      .active:before{
        content: '●';
        font-size: 31px;
        color:#FFD73A;
        margin-left: -20px;
      }
      .active span{
        display: inline-block;
        font-size: 25px;
      }
      span{
        display: none;

      }
    }
  }


</style>
