/**
*   Created By  YS  on 2018/8/8
*   卡券管理总页面
*/
<template>
  <div class="card-box">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="优惠券" name="first">

      </el-tab-pane>
      <el-tab-pane label="会员卡" name="second">
        <!--<router-view> </router-view>-->
      </el-tab-pane>
    </el-tabs>
    <router-view ></router-view>
    <!--<div @click="push">123</div>-->
    <!--<router-view></router-view>-->
  </div>

</template>

<script>
    // import  vipcard from '@/'
    export default {
        name: "cardManage",
      data(){
          return{
            show:false,
            activeName: 'first'
          }
      },
      methods:{
        handleClick(tab, event) {
          switch (this.activeName) {
            case 'first':
              this.$router.push({
                path: '/centerIndex/cardManage/priceCard'
              });
              break;
            case 'second':
              this.$router.push({
                path: '/centerIndex/cardManage/vipCard'
              });
              break;
          }
        },
      },
      // mounted(){
      //     this.$router.push({
      //       path:'/cardManage/vipCard'
      //     })
      //
      // }
      created(){
        if(sessionStorage.getItem("cardManage")){
          this.activeName=sessionStorage.getItem('cardManage')
        }

        window.addEventListener("beforeunload",()=>{
          sessionStorage.setItem("cardManage",this.activeName)
        })
      }
    }
</script>

<style lang='less' scoped>

  .card-box{
    width: 1200px;
    /deep/ .el-tabs__content{
      overflow: visible !important;
    }
  }
</style>
