<template>
  <div class="cb-box">
      <div class="left">
        <div class="point " :class="{big:item.active}" v-for="item in navList"></div>
        <!--<div class="point"></div>-->
      </div>
      <div class="right">
        <div class="text"
             @click="href(index,item.router)"
             :class="{big:item.active,}"
             v-for="(item,index) in selfNavList"
             v-cloak>
          {{item.name}} <span :class="{'el-icon-caret-right':item.active}"></span>
        </div>
      </div>
  </div>
</template>

<script>
    export default {
        name: "steps",
      props:{
        navList:{
          type:Array,
          default:function () {
            return [
              {
                name:'素材中心',
                active:true,
                router:'/index'
              },
              {
                name:'首页',
                active:false,
                router:'/client/clientList'
              },
              {
                name:'商品',
                active:false
              },
              {
                name:'实体店',
                active:false
              },{
                name:"卡券管理",
                active:false
              }
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
                item.active=false
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
            this.selfNavList=this.navList
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
      .big:before{
        content: '●';
        font-size: 31px;
        color:#FFD73A;
        margin-left: -20px;
      }
      .big{
        font-size: 20px;
      }
      span{
        font-size: 25px;
      }
    }
  }


</style>
